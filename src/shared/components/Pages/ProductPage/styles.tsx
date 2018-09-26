import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import {blueGrey, teal} from '@material-ui/core/colors';

export const styles = (theme: Theme) => createStyles({
  root: {
    width: "100%",
    maxWidth: "1400px",
    margin: "auto",
  },
  buyBtn: {
    minWidth: "300px",
    fontSize: 18,
    color: blueGrey[50],
    backgroundColor: teal[500],
    borderColor: teal[600],
    '&:hover': {
      backgroundColor: teal[700],
      borderColor: teal[800],
    },
    '&:active': {
      backgroundColor: teal[700],
      borderColor: teal[800],
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
  sliderParent: {
  },
});
