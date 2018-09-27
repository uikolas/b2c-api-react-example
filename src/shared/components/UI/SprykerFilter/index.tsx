import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import {styles} from './styles';

export interface IMenuItemsDropdown {
  value: string | number;
  doc_count: string | number;
}

interface SprykerFilterProps extends WithStyles<typeof styles> {
  attributeName?: string;
  handleChange?: Function;
  menuItems?: Array<IMenuItemsDropdown>;
}

interface SprykerFilterState {
  isOpen: boolean;
  value: any[];
}

export class SprykerFilter extends React.Component<SprykerFilterProps, SprykerFilterState> {

  public state: SprykerFilterState = {
    isOpen: false,
    value: [],
  };

  private handleChangeShowing = (): void => {
    this.setState(prev => ({isOpen: !prev.isOpen}));
  }

  private handleChangeValues = (event: any) => {
    this.setState({ value: event.target.value });
    this.props.handleChange(this.props.attributeName, event.target.value);
  }

  private handleDelete = (item: any) => () => {
    const values = [...this.state.value].filter((val) => val !== item);
    this.setState({value: values});
    this.props.handleChange(this.props.attributeName, values);
  }

  public render() {
    const {
      classes,
      attributeName,
      menuItems,
    } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <Select
            multiple
            inputProps={{
              name: attributeName,
              id: `${attributeName}-filter`,
            }}
            renderValue={() => attributeName}
            displayEmpty
            open={this.state.isOpen}
            onClose={this.handleChangeShowing}
            onOpen={this.handleChangeShowing}
            value={this.state.value}
            onChange={this.handleChangeValues}
            variant="filled"
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.value}
                value={item.value}
                className={classes.menuItem}
              >
                <span>{item.value}</span>
                <span>{item.doc_count}</span>
              </MenuItem>))
            }
          </Select>
          {this.state.value.map(item => (
            <Chip
              key={item}
              label={item}
              variant="outlined"
              onDelete={this.handleDelete(item)}
              className={classes.chip}
            />))
          }
        </FormControl>
      </div>
    );
  }
}

export const SprykerFilterElement = withStyles(styles)(SprykerFilter);
