export interface DynamicColumn<T extends string> {
  [key: T]: Array<any>;
}
