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
    flexGrow: .9,
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
    display: 'block',
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
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
  },
  pendingProgress: {
    position: 'absolute',
    left: '40%',
  },
  completion: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.unit / 2,
  },
  marginTop: {
    marginTop: theme.spacing.unit,
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imgWrapper: {
    display: 'flex',
    position: 'relative',
    width: '80px',
    height: '80px',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.unit,
  },
  actionAreaOverlay: {
    position: "absolute",
    background: "rgba(0, 0, 0, 0.10)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 350,
  },
});
