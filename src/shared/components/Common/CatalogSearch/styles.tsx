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
    flexGrow: 1,
  },
  suggestionsContainer: {
    display: 'none',
  },
  suggestionsContainerOpen: {
    display: 'block',
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
  inputRoot: {
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingLeft: 5,
  },
  inputOutline: {
    border: '1px solid #d9d9d9',
    backgroundColor: theme.palette.common.white,
    zIndex: 1,
  },
  input: {
    fontSize: 16,
    lineHeight: '20px',
    fontWeight: 'bold',
    color: theme.appColors.grey,
    padding: 13,
    zIndex: 2,
  },
  inputIconContainer: {
    position: 'relative',
    zIndex: 2,
    margin: 0,
  },
  inputIcon: {
    fill: `${theme.appColors.grey} !important`,
  },
  menuItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    textDecoration: 'none',
    flexGrow: 1,
  },
  pendingProgress: {
    position: 'absolute',
    left: '40%',
  },
});
