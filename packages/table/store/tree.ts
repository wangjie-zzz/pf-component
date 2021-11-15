import { walkTreeNode, getRowIdentity } from "../util";
import { ref, computed, watch, getCurrentInstance, unref } from "vue";
import { WatcherPropsData, Table, fn } from "../table.type";
/* eslint-disable */
function useTree(watcherData: WatcherPropsData) {
  const expandRowKeys = ref([]);
  const treeData = ref({});
  const indent = ref(16);
  const lazy = ref(false);
  const lazyTreeNodeMap = ref({});
  const lazyColumnIdentifier = ref("hasChildren");
  const childrenColumnName = ref("children");
  const instance = getCurrentInstance() as Table;
  const normalizedData = computed(() => {
    if (!watcherData.rowKey.value) return {};
    const data = watcherData.data.value || [];
    return normalize(data);
  });
  const normalizedLazyNode = computed(() => {
    const rowKey = watcherData.rowKey.value;
    const keys = Object.keys(lazyTreeNodeMap.value);
    const res = {};
    if (!keys.length) return res;
    keys.forEach(key => {
      // @ts-ignore
      if (lazyTreeNodeMap.value[key].length) {
        const item = { children: [] };
        // @ts-ignore
        lazyTreeNodeMap.value[key].forEach(row => {
          const currentRowKey = getRowIdentity(row, rowKey);
          // @ts-ignore
          item.children.push(currentRowKey);
          // @ts-ignore
          if (row[lazyColumnIdentifier.value] && !res[currentRowKey]) {
            // @ts-ignore
            res[currentRowKey] = { children: [] };
          }
        });
        // @ts-ignore
        res[key] = item;
      }
    });
    return res;
  });

  // @ts-ignore
  const normalize = data => {
    const rowKey = watcherData.rowKey.value;
    const res = {};
    walkTreeNode(
      data,
      // @ts-ignore
      (parent, children, level) => {
        const parentId = getRowIdentity(parent, rowKey);
        if (Array.isArray(children)) {
          // @ts-ignore
          res[parentId] = {
            children: children.map(row => getRowIdentity(row, rowKey)),
            level
          };
        } else if (lazy.value) {
          // 当 children 不存在且 lazy 为 true，该节点即为懒加载的节点
          // @ts-ignore
          res[parentId] = {
            children: [],
            lazy: true,
            level
          };
        }
      },
      childrenColumnName.value,
      lazyColumnIdentifier.value
    );
    return res;
  };

  const updateTreeData = () => {
    const nested = normalizedData.value;
    const normalizedLazyNode_ = normalizedLazyNode.value;
    const keys = Object.keys(nested);
    const newTreeData = {};
    if (keys.length) {
      const oldTreeData = unref(treeData);
      const defaultExpandAll = instance.store?.states.defaultExpandAll.value;
      // @ts-ignore
      const rootLazyRowKeys = [];
      // @ts-ignore
      const getExpanded = (oldValue, key) => {
        // @ts-ignore
        const included = defaultExpandAll || (expandRowKeys.value && expandRowKeys.value.indexOf(key) !== -1);
        return !!((oldValue && oldValue.expanded) || included);
      };
      // 合并 expanded 与 display，确保数据刷新后，状态不变
      keys.forEach(key => {
        // @ts-ignore
        const oldValue = oldTreeData[key];
        // @ts-ignore
        const newValue = { ...nested[key] };
        newValue.expanded = getExpanded(oldValue, key);
        if (newValue.lazy) {
          const { loaded = false, loading = false } = oldValue || {};
          newValue.loaded = !!loaded;
          newValue.loading = !!loading;
          rootLazyRowKeys.push(key);
        }
        // @ts-ignore
        newTreeData[key] = newValue;
      });
      // 根据懒加载数据更新 treeData
      const lazyKeys = Object.keys(normalizedLazyNode_);
      if (lazy.value && lazyKeys.length && rootLazyRowKeys.length) {
        lazyKeys.forEach(key => {
          // @ts-ignore
          const oldValue = oldTreeData[key];
          // @ts-ignore
          const lazyNodeChildren = normalizedLazyNode_[key].children;
          // @ts-ignore
          if (rootLazyRowKeys.indexOf(key) !== -1) {
            // @ts-ignore
            // 懒加载的 root 节点，更新一下原有的数据，原来的 children 一定是空数组
            if (newTreeData[key].children.length !== 0) {
              throw new Error("[ElTable]children must be an empty array.");
            }
            // @ts-ignore
            newTreeData[key].children = lazyNodeChildren;
          } else {
            const { loaded = false, loading = false } = oldValue || {};
            // @ts-ignore
            newTreeData[key] = {
              lazy: true,
              loaded: !!loaded,
              loading: !!loading,
              expanded: getExpanded(oldValue, key),
              children: lazyNodeChildren,
              level: ""
            };
          }
        });
      }
    }
    treeData.value = newTreeData;
    instance.store?.updateTableScrollY();
  };

  watch(() => normalizedData.value, updateTreeData);
  watch(() => normalizedLazyNode.value, updateTreeData);

  // @ts-ignore
  const updateTreeExpandKeys = value => {
    expandRowKeys.value = value;
    updateTreeData();
  };

  // @ts-ignore
  const toggleTreeExpansion = (row, expanded) => {
    instance.store.assertRowKey();

    const rowKey = watcherData.rowKey.value;
    const id = getRowIdentity(row, rowKey);
    // @ts-ignore
    const data = id && treeData.value[id];
    if (id && data && "expanded" in data) {
      const oldExpanded = data.expanded;
      expanded = typeof expanded === "undefined" ? !data.expanded : expanded;
      // @ts-ignore
      treeData.value[id].expanded = expanded;
      if (oldExpanded !== expanded) {
        instance.emit("expand-change", row, expanded);
      }
      instance.store.updateTableScrollY();
    }
  };

  // @ts-ignore
  const loadOrToggle = row => {
    instance.store.assertRowKey();
    const rowKey = watcherData.rowKey.value;
    const id = getRowIdentity(row, rowKey);
    // @ts-ignore
    const data = treeData.value[id];
    if (lazy.value && data && "loaded" in data && !data.loaded) {
      loadData(row, id, data);
    } else {
      toggleTreeExpansion(row, undefined);
    }
  };

  // @ts-ignore
  const loadData = (row, key, treeNode) => {
    const { load } = instance.props;
    // @ts-ignore
    if (load && !treeData.value[key].loaded) {
      // @ts-ignore
      treeData.value[key].loading = true;
      // @ts-ignore
      (load as fn)(row, treeNode, data => {
        if (!Array.isArray(data)) {
          throw new Error("[ElTable] data must be an array");
        }
        // @ts-ignore
        treeData.value[key].loading = false;
        // @ts-ignore
        treeData.value[key].loaded = true;
        // @ts-ignore
        treeData.value[key].expanded = true;
        if (data.length) {
          // @ts-ignore
          lazyTreeNodeMap.value[key] = data;
        }
        instance.emit("expand-change", row, true);
      });
    }
  };

  return {
    loadData,
    loadOrToggle,
    toggleTreeExpansion,
    updateTreeExpandKeys,
    updateTreeData,
    normalize,
    states: {
      expandRowKeys,
      treeData,
      indent,
      lazy,
      lazyTreeNodeMap,
      lazyColumnIdentifier,
      childrenColumnName
    }
  };
}

export default useTree;
