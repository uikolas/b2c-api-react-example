import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  pageHeader: {
    marginBottom: theme.spacing.unit * 2,
  },
  searchTerm: {
    fontStyle: "italic",
    fontWeight: "bold",
    display: "inline",
  },
  categoryList: {
    width: '95%',
  },
  buttonsRow: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  empty: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: "0 auto",
  },
  formControl: {
    width: '90%',
    marginLeft: '5%'
  },
  pagesContainer: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  pageNumber: {
    maxWidth: theme.spacing.unit * 5,
  },
  nestedList: {
    marginLeft: theme.spacing.unit * 2,
  }
});
