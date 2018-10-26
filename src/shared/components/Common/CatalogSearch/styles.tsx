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
  insideWrapper: {
    padding: `0px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`
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
    width: '30vw',
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
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
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
    marginRight: theme.spacing.unit * 2,
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
