import { DictNameEnum } from "@/constants/enum/dict-name.enum";
import { FormModel } from "@/model/entity/FormModel";

export const TableTypeEnum = {
  selection: { code: "selection", name: "" },
  expand: { code: "expand", name: "" },
  index: { code: "index", name: "" }
};
export class TableModel {
  name: string;
  columns: TableColumnModel[];
  showPage?: boolean;
  height?: string;
  maxHeight?: string;
  stripe?: boolean; /*有斑马纹 false*/
  border?: boolean; /*有纵向边框 false*/
  size?: string; /*medium / small / mini*/
  fit?: boolean; /*列的宽度自动撑开 true*/
  showHeader?: boolean; /*显示表头 true */
  highlightCurrentRow?: boolean; /*高亮显示当前行 false */
  rowKey?: string; /*reserveSelection*/
  emptyText?: string; /*空数据自定义文本显示*/
  showSummary?: boolean; /*是否在表尾显示合计行	false*/
  sumText?: string; /*合计行第一列的文本	String	—	合计*/
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  summaryMethod?: ({ columns, data }) => void; /*自定义的合计计算方法*/
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  spanMethod?: ({ row, column, rowIndex, columnIndex }) => void; /*合并行或列的计算方法*/
  selectOnIndeterminate?: boolean; /*在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行	true*/
  constructor(param: {
    name: string;
    columns: TableColumnModel[];
    showPage?: boolean;
    height?: string;
    maxHeight?: string;
    stripe?: boolean;
    border?: boolean;
    size?: string;
    fit?: boolean;
    showHeader?: boolean;
    highlightCurrentRow?: boolean;
    rowKey?: string;
    emptyText?: string;
    showSummary?: boolean;
    sumText?: string;
    summaryMethod?: ({ columns, data }: any) => void /*自定义的合计计算方法*/;
    spanMethod?: ({ row, column, rowIndex, columnIndex }: any) => void /*合并行或列的计算方法*/;
    selectOnIndeterminate?: boolean;
  }) {
    this.name = param.name;
    this.columns = param.columns || [];
    this.showPage = param.showPage || false;
    this.height = param.height;
    this.maxHeight = param.maxHeight;
    this.stripe = param.stripe;
    this.border = param.border;
    this.size = param.size;
    this.fit = param.fit;
    this.showHeader = param.showHeader;
    this.highlightCurrentRow = param.highlightCurrentRow;
    this.rowKey = param.rowKey;
    this.emptyText = param.emptyText;
    this.showSummary = param.showSummary;
    this.sumText = param.sumText;
    this.summaryMethod = param.summaryMethod;
    this.spanMethod = param.spanMethod;
    this.selectOnIndeterminate = param.selectOnIndeterminate;
  }
  checkbox(): TableModel {
    this.columns.splice(
      0,
      0,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      new TableColumnModel({
        prop: "checkbox",
        label: "",
        type: TableTypeEnum.selection.code,
        width: "50"
      })
    );
    return this;
  }
}

// TODO 页面挂载前，将null 或 undefined 传入<form>时，会有问题：因为对象新增的属性，是没有响应式的
export const emptyTable = new TableModel({ name: "", columns: [] });
export class TableColumnModel {
  prop: string; /*也可以使用 property 属性	*/
  label: string;
  dict?: DictNameEnum;
  width?: string; /*对应列的宽度*/
  minWidth?: string; /*对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列*/
  fixed?: boolean | string; /*列是否固定在左侧或者右侧，true表示固定在左侧true/left/right  false*/
  type?: string; /*对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮 selection/index/expand 默认空*/
  index?: number | ((idx: any) => number); /*如果设置了 type=index，可以通过传递 index 属性来自定义索引*/
  selectable?: (row: any, index: any) => boolean; /*type=selection时，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选*/
  reserveSelection?: boolean; /*type=selection，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）false*/
  columnKey?: string; /*column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件*/
  renderHeader?: (h: any, { column, $index }: any) => void; /*列标题 Label 区域渲染使用的 Function*/
  sortable?: boolean | string; /*对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件	true/false/'custom'	false*/
  sortMethod?: (a: any, b: any) => number; /*对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字*/
  sortBy?: string | string[] | ((row: any, idx: any) => void); /*指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。*/
  sortOrders?: any[]; /*仅当 sortable 为 true 时有效。ascending 表示升序，descending 表示降序，null 表示还原为原始顺序	['ascending', 'descending', null]*/
  resizable?: boolean; /*对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）	true*/
  formatter?: any; /*用来格式化内容	Function(row, column, cellValue, index)*/
  showOverflowTooltip?: boolean; /*当内容过长被隐藏时显示 tooltip	false*/
  align?: string; /*对齐方式	left/center/right	left*/
  headerAlign?: string; /*表头对齐方式，若不设置该项，则使用表格的对齐方式	String	left/center/right*/
  constructor(param: {
    prop: string;
    label: string;
    dict?: DictNameEnum;
    type?: string;
    index?: number | ((idx: any) => number);
    selectable?: (row: any, index: any) => boolean;
    reserveSelection?: boolean;
    columnKey?: string;
    width?: string;
    minWidth?: string;
    fixed?: boolean | string;
    renderHeader?: (h: any, { column, $index }: any) => void;
    sortable?: boolean | string;
    sortMethod?: (a: any, b: any) => number;
    sortBy?: string | string[] | ((row: any, idx: any) => void);
    sortOrders?: any[];
    resizable?: boolean;
    formatter?: any;
    showOverflowTooltip?: boolean;
    align?: string;
    headerAlign?: string;
  }) {
    this.type = param.type;
    this.index = param.index;
    this.dict = param.dict;
    this.selectable = param.selectable;
    this.reserveSelection = param.reserveSelection;
    this.columnKey = param.columnKey;
    this.prop = param.prop;
    this.label = param.label;
    this.width = param.width;
    this.minWidth = param.minWidth;
    this.fixed = param.fixed;
    this.renderHeader = param.renderHeader;
    this.sortable = param.sortable;
    this.sortMethod = param.sortMethod;
    this.sortBy = param.sortBy;
    this.sortOrders = param.sortOrders;
    this.resizable = param.resizable;
    this.formatter = param.formatter;
    this.showOverflowTooltip = param.showOverflowTooltip;
    this.align = param.align;
    this.headerAlign = param.headerAlign;
  }
}
// currentRowKey?: boolean; /*当前行的 key，只写属性 */
/*row-class-name	行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。	Function({row, rowIndex})/String	—	—
row-style	行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。	Function({row, rowIndex})/Object	—	—
cell-class-name	单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。	Function({row, column, rowIndex, columnIndex})/String	—	—
cell-style	单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。	Function({row, column, rowIndex, columnIndex})/Object	—	—
header-row-class-name	表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。	Function({row, rowIndex})/String	—	—
header-row-style	表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。	Function({row, rowIndex})/Object	—	—
header-cell-class-name	表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。	Function({row, column, rowIndex, columnIndex})/String	—	—
header-cell-style	表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。	Function({row, column, rowIndex, columnIndex})/Object	—	—
*/
/*default-expand-all	是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效	Boolean	—	false
expand-row-keys	可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。	Array	—
default-sort	默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序	Object	order: ascending, descending	如果只指定了prop, 没有指定order, 则默认顺序是ascending
tooltip-effect	tooltip effect 属性	String	dark/light
indent	展示树形数据时，树节点的缩进	Number	—	16
lazy	是否懒加载子节点数据	Boolean	—	—
load	加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息	Function(row, treeNode, resolve)	—	—
tree-props	渲染嵌套数据的配置选项	Object	—	{ hasChildren: 'hasChildren', children: 'children' }*/
/*
行数据的 Key，Function(row)/String	—	—
用来优化 Table 的渲染；
在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。
类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，
此种情况请使用 Function。	*/

/*
*
filters /*数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。	Array[{ text, value }]
class-name	列的 className	string	—	—
  label-class-name	当前列标题的自定义类名	string	—	—
  filter-placement	过滤弹出框的定位	String	与 Tooltip 的 placement 属性相同	—
  filter-multiple	数据过滤的选项是否多选	Boolean	—	true
filter-method	数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。	Function(value, row, column)	—	—
  filtered-value	选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。	Array*/
