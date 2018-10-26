import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import { CloseOutlined } from '@material-ui/icons';

import { styles } from './styles';
import {SearchPageContext} from '../context';
import {TFilterItemName, TFilterItemValue} from "src/shared/components/Pages/SearchPage/types";
import {firstLetterToUpperCase} from "src/shared/helpers/common/transform";

interface ActiveFilterItemProps extends WithStyles<typeof styles> {
  filterValue: TFilterItemValue;
  filterName: TFilterItemName;
}

export const ActiveFilterItemBase: React.SFC<ActiveFilterItemProps> = (props) => {
  const {
    classes,
    filterValue,
    filterName,
  } = props;

  let title: string;
  let filterNameParts = filterName.split('_');
  if (filterNameParts.length) {
    filterNameParts[0] = firstLetterToUpperCase(filterNameParts[0]);
    title = filterNameParts.join(' ');
  }

  return (

    <SearchPageContext.Consumer>
      {({deleteActiveFilterHandler}) => (
        <Chip
          label={`${(title)}: ${filterValue}`}
          variant="outlined"
          className={classes.chip}
          onDelete={ deleteActiveFilterHandler(filterName, filterValue) }
          deleteIcon={<CloseOutlined className={classes.close} />}
          classes={{label: classes.label}}
        />
      ) }
    </SearchPageContext.Consumer>
  );
};

export const ActiveFilterItem = withStyles(styles)(ActiveFilterItemBase);
