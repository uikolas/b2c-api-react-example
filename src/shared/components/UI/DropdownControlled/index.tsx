import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import {styles} from './styles';

export const defaultItemValue = " ";

export interface IMenuItemsDropdown {
  value: string | number;
  name: string | number;
}

interface DropdownControlledProps extends WithStyles<typeof styles> {
  nameAttr: string;
  nameToShow?: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode) => void;
  menuItems: Array<IMenuItemsDropdown>;
  menuItemFirst?: IMenuItemsDropdown;
}

interface DropdownControlledState {
  isOpen: boolean;
}

export class DropdownControlledBase extends React.Component<DropdownControlledProps, DropdownControlledState> {

  public state = {
    isOpen: false,
  };

  private handleChangeShowing = (): void => {
    this.setState(prev => ({isOpen: !prev.isOpen}));
  }

  public render() {
    const {
      classes,
      nameAttr,
      nameToShow,
      value,
      handleChange,
      menuItems,
      menuItemFirst = {
        value: defaultItemValue,
        name: 'please select',
      }
    } = this.props;

    if (!nameAttr || !value || !handleChange || !menuItems) {
      return null;
    }
    const inputId = `${nameAttr}-controlled-open-select`;

    return (
      <div className={classes.root}>
        { nameToShow
          ?  <Button className={classes.button} onClick={this.handleChangeShowing}>
              {nameToShow}
            </Button>
          : null
        }
        <FormControl className={classes.formControl}>
          <Select
            open={this.state.isOpen}
            onClose={this.handleChangeShowing}
            onOpen={this.handleChangeShowing}
            value={value}
            onChange={handleChange}
            id={inputId}
            name={nameAttr}
            variant="filled"
          >
            <MenuItem value={menuItemFirst.value}><em>{menuItemFirst.name}</em></MenuItem>
            {menuItems.map((item) => {
              return (
                <MenuItem
                  key={item.value}
                  value={item.value}
                >
                  {item.name}
                  </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export const DropdownControlled = withStyles(styles)(DropdownControlledBase);

