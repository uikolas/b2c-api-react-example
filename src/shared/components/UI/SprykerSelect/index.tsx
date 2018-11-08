import * as React from 'react';
import {ChangeEvent, ReactNode} from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { ChevronLeft } from '@material-ui/icons';

import { styles } from './styles';
import {IMenuItemFirst, IMenuItemSelect} from "src/shared/components/UI/SprykerSelect/types";


export interface SprykerSelectProps extends WithStyles<typeof styles> {
  currentMode: string | number | boolean;
  changeHandler: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
  name: string;
  menuItems: Array<IMenuItemSelect>;
  menuItemFirst?: IMenuItemFirst | null;
  title?: string;
}


export const SprykerSelectBase: React.SFC<SprykerSelectProps> = (props) => {
  const {
    classes,
    currentMode,
    changeHandler,
    menuItems,
    name,
    menuItemFirst = {
      // Do not change default value!!!!
      value: " ",
      name: 'please select',
      selected: false,
      disabled: false,
    },
    title,
  } = props;

  const getMenuItemFirst = () => {
    if (!menuItemFirst) {
      return null;
    }
    return (
      <MenuItem
        value={ menuItemFirst.value }
        selected={ menuItemFirst.selected }
        disabled={ menuItemFirst.disabled }
        disableGutters
        classes={{
          selected: classes.selected,
        }}
        className={ classes.menuItem }
      >
        { menuItemFirst.name }
      </MenuItem>
    );
  };

  const isMenuItemsExist = (menuItems.length > 0);

  return (
    <Grid container
          justify="center"
          alignItems="center"
          className={ classes.root }
    >
      <Grid item xs={ 12 }>
        <FormControl className={ classes.formControl }>
          { (title && isMenuItemsExist)
            ? <Typography component="span" className={classes.title}>{title}</Typography>
            : null
          }
          <Select
            value={currentMode }
            onChange={changeHandler}
            name={name}
            classes={{
              icon: classes.icon,
              select: classes.input,
            }}
            disableUnderline= {true}
            IconComponent={ChevronLeft}
          >
            { getMenuItemFirst() }
            {isMenuItemsExist && menuItems.map((item) => (
              <MenuItem
                value={item.value}
                key={`${item.name}-${item.value}`}
                disableGutters
                classes={{
                  selected: classes.selected,
                }}
                className={ classes.menuItem }
              >
                {item.name}
              </MenuItem>
            ))
            }
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export const SprykerSelect = withStyles(styles)(SprykerSelectBase);
