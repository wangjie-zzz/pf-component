import { ref, getCurrentInstance } from "vue";
import { toggleRowStatus, getKeysMap, getRowIdentity } from "../util";
import { WatcherPropsData, Table, AnyObject } from "../table.type";
/* eslint-disable */
function useExpand(watcherData: WatcherPropsData) {
  const instance = getCurrentInstance() as Table;
  const defaultExpandAll = ref(false);
  const expandRows = ref([]);
  const updateExpandRows = () => {
    const data = watcherData.data.value || [];
    const rowKey = watcherData.rowKey.value;
    if (defaultExpandAll.value) {
      // @ts-ignore
      expandRows.value = data.slice();
    } else if (rowKey) {
      // TODO：这里的代码可以优化
      const expandRowsMap = getKeysMap(expandRows.value, rowKey);
      expandRows.value = data.reduce((prev, row) => {
        const rowId = getRowIdentity(row, rowKey);
        const rowInfo = expandRowsMap[rowId];
        if (rowInfo) {
          prev.push(row);
        }
        return prev;
      }, []);
    } else {
      expandRows.value = [];
    }
  };

  const toggleRowExpansion = (row: AnyObject, expanded: boolean | undefined) => {
    // @ts-ignore
    const changed = toggleRowStatus(expandRows.value, row, expanded);
    if (changed) {
      instance.emit("expand-change", row, expandRows.value.slice());
      instance.store.scheduleLayout();
    }
  };

  const setExpandRowKeys = (rowKeys: string[]) => {
    instance.store.assertRowKey();
    // TODO：这里的代码可以优化
    const data = watcherData.data.value || [];
    const rowKey = watcherData.rowKey.value;
    const keysMap = getKeysMap(data, rowKey);
    // @ts-ignore
    expandRows.value = rowKeys.reduce((prev: string[], cur: string) => {
      const info = keysMap[cur];
      if (info) {
        prev.push(info.row);
      }
      return prev;
    }, []);
  };

  const isRowExpanded = (row: AnyObject): boolean => {
    const rowKey = watcherData.rowKey.value;
    if (rowKey) {
      const expandMap = getKeysMap(expandRows.value, rowKey);
      return !!expandMap[getRowIdentity(row, rowKey)];
    }
    // @ts-ignore
    return expandRows.value.indexOf(row) !== -1;
  };
  return {
    updateExpandRows,
    toggleRowExpansion,
    setExpandRowKeys,
    isRowExpanded,
    states: {
      expandRows,
      defaultExpandAll
    }
  };
}

export default useExpand;
