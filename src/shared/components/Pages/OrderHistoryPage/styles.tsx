import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import {blueGrey, teal, grey} from '@material-ui/core/colors';

export const styles = (theme: Theme) => createStyles({
  root: {
    width: "100%",
    maxWidth: "1400px",
    margin: "auto",
  },
});
