export interface Page<T> {
  records: T[];
  recordTotal: number;
  pageSize: number;
  pageNum: number;
}
