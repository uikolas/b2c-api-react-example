import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';

import { styles } from './styles';
import {SearchPageContext} from '../context';
import {TFilterItemName, TFilterItemValue} from "src/shared/components/Pages/SearchPage/types";
import {firstLetterToUpperCase} from "src/shared/helpers/common/transform";

interface ActiveFilterItemProps extends WithStyles<typeof styles> {
  label: TFilterItemValue;
  filterName: TFilterItemName;
}

export const ActiveFilterItemBase: React.SFC<ActiveFilterItemProps> = (props) => {
  const {
    classes,
    label,
    filterName,
  } = props;

  let title: string;
  let filterNameParts = filterName.split('_');
  if (filterNameParts.length) {
    filterNameParts[0] = firstLetterToUpperCase(filterNameParts[0]);
    title = filterNameParts.join(' ');
  }

  return (
    // handleDelete

    // onDelete={ this.handleDelete(item) }
    <SearchPageContext.Consumer>
      {({selectCategoryHandler}) => (
        <Chip
          label={`${(title)}: ${label}`}
          variant="outlined"
          className={classes.chip}
        />
      ) }
    </SearchPageContext.Consumer>
  );
};

export const ActiveFilterItem = withStyles(styles)(ActiveFilterItemBase);
