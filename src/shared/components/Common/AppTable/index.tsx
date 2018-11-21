import * as React from 'react';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { styles } from './styles';

export interface ICellInfo {
  colSpan?: number | null;
  rowSpan?: number | null;
  content: React.HTMLAttributes<HTMLElement> | string;
}

export interface ITableRow {
  id?: number;
  cells?: Array<ICellInfo>;
}

interface AppTableProps extends WithStyles<typeof styles> {
  headerCells: Array<ICellInfo>;
  bodyRows: Array<ITableRow>;
  footerCells?: Array<ICellInfo>;
  isRowHover?: boolean;
}

  /**
   * TODO:
   * 1. Move types to separate types file;
   * 2. Try not to use index in an array loops -
   * https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318   *
   * 4. Fix styles.tsx
   * - use properties from src/shared/theme/properties/new (colors, dimension) and theme.spacing.unit * 1.5
   * 5. Is it necessary to use rowHover css class and isRowHover property?
   * 6. Try to pass empty array to headerCells, bodyRows, footerCells
   *
   *  */

export const AppTableBase: React.SFC<AppTableProps> = (props) => {
  const {classes, isRowHover, headerCells, bodyRows, footerCells} = props;
  const rowClass =  isRowHover ? `${classes.rowHover}  ${classes.bodyRow}` : classes.bodyRow;

  return (
    <Table className={classes.root}>
      {
        headerCells
        ? (<TableHead className={classes.header}>
            <TableRow className={classes.headerRow} classes={{hover: classes.rowHover}}>
              {headerCells.map((cell, index) => (
                <TableCell
                  colSpan={cell.colSpan}
                  rowSpan={cell.rowSpan}
                  key={index}
                  className={classes.headerCell}
                >
                  {cell.content}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>)
          : null
      }

      <TableBody className={classes.body}>
        {bodyRows.map((row, rowIndex) => (
          <TableRow key={row.id ? row.id: rowIndex} className={rowClass}>
            {row.cells.map((cell, cellIndex) => (
              <TableCell
                colSpan={cell.colSpan}
                rowSpan={cell.rowSpan}
                key={rowIndex + cellIndex}
                className={classes.bodyCell}
              >
                {cell.content}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>

      {
        footerCells
          ? (<TableFooter>
              <TableRow>
                {footerCells.map((cell, index) => (
                  <TableCell
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                    key={index}
                    className={classes.footerCell}
                  >
                    {cell.content}
                  </TableCell>
                ))}
              </TableRow>
            </TableFooter>)
          : null
      }
    </Table>
  );
};

export const AppTable = withStyles(styles)(AppTableBase);
