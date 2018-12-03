import * as React from "react";
import {WithStyles} from '@material-ui/core';
import {styles} from './styles';


export interface ICellInfo {
  id: string;
  colSpan?: number | null;
  rowSpan?: number | null;
  // content: React.HTMLAttributes<HTMLElement> | string;
  content: JSX.Element | string | number;
}

export interface ITableRow {
  id: string;
  cells?: Array<ICellInfo>;
}

export interface IAppTableProps extends WithStyles<typeof styles> {
  headerCells: Array<ICellInfo> | null;
  bodyRows: Array<ITableRow>;
  footerCells?: Array<ICellInfo> | null;
  isRowHover?: boolean;
}
