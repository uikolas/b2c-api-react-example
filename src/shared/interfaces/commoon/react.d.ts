import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface Styles {
  className?: string;
  style?: React.CSSProperties;
}

export interface Component extends Styles {
  children?: React.ReactNode[] | React.Element | string;
}

export type ClickEvent = React.MouseEvent<HTMLElement>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface WithRouter extends Partial<RouteComponentProps<any>> {

}
