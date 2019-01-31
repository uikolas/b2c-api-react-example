export interface ICategory {
    nodeId: number;
    order: number;
    name: string;
    children: ICategory[] | object;
}

export interface ICategoryForBreadcrumbs {
    nodeId: number;
    name: string;
    current?: boolean;
}
