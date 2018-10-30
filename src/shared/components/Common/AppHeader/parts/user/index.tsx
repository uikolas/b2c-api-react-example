import * as React from 'react';
import { withRouter } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Popover from '@material-ui/core/Popover';
import Person from '@material-ui/icons/Person';

import { ClickEvent } from 'src/shared/interfaces/commoon/react';
import { pathCustomerProfilePage, pathLoginPage } from 'src/shared/routes/contentRoutes';
import { PopoverDrop } from '../popoverDrop';
import { UserDrop } from './userDrop';
import { UserProps as Props, UserState as State } from './types';
import { connect } from './connect';
import { styles } from './styles';

@connect
@(withRouter as any)
export class UserComponent extends React.PureComponent<Props, State> {
  public state: State = {
    anchorEl: null,
  };

  public componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      this.closePopover();
    }
  }

  private openPopover = ({currentTarget}: ClickEvent) => {
    if (window.innerWidth < 500) {
      if (this.props.isUserLoggedIn) {
        this.props.history.push(pathCustomerProfilePage);
      } else {
        this.props.history.push(pathLoginPage);
      }
    } else {
      this.setState(() => ({anchorEl: currentTarget}));
    }
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
