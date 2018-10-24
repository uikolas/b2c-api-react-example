import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Popover from '@material-ui/core/Popover';
import Person from '@material-ui/icons/Person';

import { PopoverDrop } from '../popoverDrop';
import { UserDrop } from './userDrop';
import { UserProps as Props, UserState as State } from './types';
import { styles } from './styles';

export class UserComponent extends React.PureComponent<Props, State> {
  public state: State = {
    anchorEl: null,
  };

  private openPopover = ({currentTarget}: React.MouseEvent<HTMLElement>) => {
    this.setState(() => ({anchorEl: currentTarget}));
  };
  private closePopover = () => this.setState(() => ({anchorEl: null}));

  public render() {
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);
    const popoverProps = {
      open,
      anchorEl,
      elevation: 0,
      onClose: this.closePopover,
    };

    return (
      <div>
        <IconButton aria-label="person" onClick={ this.openPopover }>
          <Person/>
        </IconButton>

        <Popover
          { ...popoverProps }
          anchorOrigin={ {vertical: 'bottom', horizontal: 'center'} }
          transformOrigin={ {vertical: 'top', horizontal: 'center'} }
        >
          <PopoverDrop>
            <UserDrop />
          </PopoverDrop>
        </Popover>
      </div>
    );
  }
}

export const User = withStyles(styles)(UserComponent);
