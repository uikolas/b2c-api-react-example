import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  pageHeader: {
    marginBottom: theme.spacing.unit * 8,
  },
  searchTerm: {
    fontStyle: "italic",
    fontWeight: "bold",
    display: "inline",
  },
  container: {
    maxWidth: "1400px",
    margin: "auto",
  }
});
