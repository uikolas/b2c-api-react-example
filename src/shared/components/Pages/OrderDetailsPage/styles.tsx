import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { lightGreen } from '@material-ui/core/colors';

export const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: '1400px',
    margin: 'auto',
  },
  reorderBtn: {
    minWidth: 220,
    color: lightGreen[200],
    backgroundColor: lightGreen[800],
    border: `2px solid ${lightGreen[50]}`,
    '&:hover': {
      backgroundColor: lightGreen[200],
      borderColor: lightGreen[800],
      color: lightGreen[800],
    },
    '&:active': {
      backgroundColor: lightGreen[200],
      borderColor: lightGreen[800],
      color: lightGreen[800],
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
  section: {
    borderBottom: `1px solid ${theme.palette.grey.A100}`,
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit,
  },
  btnOuter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});
