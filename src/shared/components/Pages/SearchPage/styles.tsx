import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  container: {
    minHeight: "100vh",
  },
  pagesContainer: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  pageNumber: {
    maxWidth: theme.spacing.unit * 5,
  },
  spellingSuggestion: {
    color: theme.appColors.blue,
  },
});
