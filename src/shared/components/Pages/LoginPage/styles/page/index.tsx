import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  container: {
    position: 'relative',
    paddingTop: theme.spacing.unit * 6,
  },
  divider: {
    border: '6px solid #aaa',
    height: '80%',
    position: 'absolute',
    top: 0,
    left: 'calc(50% - 6px)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
});
