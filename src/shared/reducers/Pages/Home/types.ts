import {IReduxState} from "src/typings/app";


export interface IHomeState extends IReduxState {
  data: {
    items?: any[],
    items_count?: number,
  };
}

export type TPageHomeAction = {
  type: string;
  payloadFulfilled?: {};
  error?: string;
};
