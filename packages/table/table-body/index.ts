import { addClass, removeClass } from "../../util/dom-util";
import { defineComponent, getCurrentInstance, h, PropType, watch, onUnmounted } from "vue";
import { hColgroup } from "../h-helper";
import useLayoutObserver from "../layout-observer";
import { Store, Table } from "../table.type";
import useRender from "./render-helper";
import { TableBodyProps } from "./table-body";
import { removePopper, isServer } from "../util";
/* eslint-disable */
export default defineComponent({
  name: "ElTableBody",
  props: {
    store: {
      required: true,
      type: Object as PropType<Store>
    },
    stripe: Boolean,
    tooltipEffect: String,
    context: {
      default: () => ({}),
      type: Object
    },
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    fixed: {
      type: String,
      default: ""
    },
    highlight: Boolean
  },
  setup(props) {
    const instance = getCurrentInstance();
    // @ts-ignore
    const parent = instance.parent as Table;

    const { wrappedRowRender, tooltipVisible, tooltipContent, tooltipTrigger } = useRender(props as TableBodyProps);
    const { onColumnsChange, onScrollableChange } = useLayoutObserver(parent);

    watch(props.store.states.hoverRow, (newVal: any, oldVal: any) => {
      if (!props.store.states.isComplex.value || isServer) return;
      let raf = window.requestAnimationFrame;
      if (!raf) {
        raf = fn => window.setTimeout(fn, 16);
      }
      raf(() => {
        // @ts-ignore
        const rows = instance.vnode.el.querySelectorAll(".el-table__row");
        const oldRow = rows[oldVal];
        const newRow = rows[newVal];
        if (oldRow) {
          removeClass(oldRow, "hover-row");
        }
        if (newRow) {
          addClass(newRow, "hover-row");
        }
      });
    });

    onUnmounted(() => {
      removePopper?.();
    });

    return {
      onColumnsChange,
      onScrollableChange,
      wrappedRowRender,
      tooltipVisible,
      tooltipContent,
      tooltipTrigger
    };
  },
  render() {
    const data = this.store.states.data.value || [];
    return h(
      "table",
      {
        class: "el-table__body",
        cellspacing: "0",
        cellpadding: "0",
        border: "0"
      },
      [
        hColgroup(this.store.states.columns.value),
        h("tbody" as any, {}, [
          data.reduce((acc, row) => acc.concat(this.wrappedRowRender(row, acc.length)), [])
        ] as any)
      ]
    );
  }
});
