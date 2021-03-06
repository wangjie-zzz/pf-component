import { Store, AnyObject } from "../table.type";

function useUtils(store: Store) {
  const setCurrentRow = (row: AnyObject) => {
    store.commit("setCurrentRow", row);
  };
  const toggleRowSelection = (row: any, selected: any) => {
    store.toggleRowSelection(row, selected, false);
    store.updateAllSelected();
  };
  const clearSelection = () => {
    store.clearSelection();
  };
  const clearFilter = (columnKeys: string[]) => {
    store.clearFilter(columnKeys);
  };
  const toggleAllSelection = () => {
    store.commit("toggleAllSelection");
  };
  const toggleRowExpansion = (row: any, expanded: any) => {
    store.toggleRowExpansionAdapter(row, expanded);
  };
  const clearSort = () => {
    store.clearSort();
  };
  const sort = (prop: any, order: any) => {
    store.commit("sort", { prop, order });
  };

  return {
    setCurrentRow,
    toggleRowSelection,
    clearSelection,
    clearFilter,
    toggleAllSelection,
    toggleRowExpansion,
    clearSort,
    sort
  };
}

export default useUtils;
