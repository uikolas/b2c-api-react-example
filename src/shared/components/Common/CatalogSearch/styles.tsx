import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    flexGrow: 0.9,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    maxHeight: '60vh',
    overflowY: 'auto',
  },
  suggestion: {
    display: 'flex',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  input: {
    backgroundColor: theme.palette.common.white,
  },
  menuItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
});
