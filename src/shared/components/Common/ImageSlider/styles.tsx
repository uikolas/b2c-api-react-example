import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {},
  slider: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%',
    maxWidth: '350px',
  },
});
