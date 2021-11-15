enum UseStateEnum {
  VAILD = 1,
  INVAILD = 0,
  FREEZE = -1
}
const isValid = (val: number): boolean => {
  return UseStateEnum.VAILD == val;
};
export { isValid };
