export interface ICategory {
    nodeId: number;
    order: number;
    name: string;
    children: ICategory[] | object;
}
