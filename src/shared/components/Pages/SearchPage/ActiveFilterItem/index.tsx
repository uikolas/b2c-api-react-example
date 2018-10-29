import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import { CloseOutlined } from '@material-ui/icons';

import { styles } from './styles';
import {SearchPageContext} from '../context';
import {IFilterItem, TFilterItemName, TFilterItemValue} from "src/shared/components/Pages/SearchPage/types";

interface ActiveFilterItemProps extends WithStyles<typeof styles>, IFilterItem {
}

export const ActiveFilterItemBase: React.SFC<ActiveFilterItemProps> = (props) => {
  const {
    classes,
    value,
    name,
    label,
    type,
    rangeSubType,
  } = props;

  return (

    <SearchPageContext.Consumer>
      {({deleteActiveFilterHandler}) => (
        <Chip
          label={label}
          variant="outlined"
          className={classes.chip}
          onDelete={ deleteActiveFilterHandler({name, value, type, rangeSubType})}
          deleteIcon={<CloseOutlined className={classes.close} />}
          classes={{label: classes.label}}
        />
      ) }
    </SearchPageContext.Consumer>
  );
};

export const ActiveFilterItem = withStyles(styles)(ActiveFilterItemBase);
