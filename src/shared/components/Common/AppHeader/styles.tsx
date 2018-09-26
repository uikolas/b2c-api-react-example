import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import {blueGrey, teal} from '@material-ui/core/colors';

export const styles = (theme: Theme) => createStyles({
  appBar: {
    position: 'relative',
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
  icon: {
    marginLeft: theme.spacing.unit * 2,
  },
  badge: {
    top: 1,
    right: -15,
    color: blueGrey[50],
    backgroundColor: teal[500],
    // The border color match the background color.
    border: `2px solid ${blueGrey[50]}`,
  }

});
