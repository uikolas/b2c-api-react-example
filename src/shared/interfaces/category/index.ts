export interface ICategory {
  nodeId: number;
  order: number;
  name: string;
  children: Array<ICategory> | object;
}
