enum BoolEnum {
  YES = 1,
  NO = 0
}
const isTrue = (val: number): boolean => {
  return BoolEnum.YES == val;
};
export { isTrue };
