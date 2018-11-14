import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  container: {
    flexGrow: 1,
  },
  insideWrapper: {
    padding: `0px 76px 80px`,
  },
  suggestionsContainer: {
    display: 'none',
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    marginTop: theme.spacing.unit,
    height: '813px',
    overflowY: 'auto',
    width: '588px',
    borderRadius: '2px',
    backgroundColor: '#ffffff',
  },
  suggestion: {
    display: 'block',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
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
    zIndex: 10,
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
    width: '100px',
    height: '100px',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.unit * 2,
    borderRadius: '1.5px',

  },
  actionAreaOverlay: {
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.10)',
    borderRadius: '1.5px',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 350,
  },
});
