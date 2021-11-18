enum TableFieldTypeEnum {
  NORMAL = 3,
  INDEX = 2,
  EXPAND = 1,
  SELECTION = 0
}
const isNormal = (val: number): boolean => {
  return TableFieldTypeEnum.NORMAL == val;
};
export { isNormal };
