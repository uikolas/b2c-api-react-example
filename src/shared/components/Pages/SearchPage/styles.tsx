import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  buttonsRow: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  empty: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: '0 auto',
  },
  formControl: {
    width: '90%',
    marginLeft: '5%',
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
  },
  spellingSuggestion: {
    color: theme.appColors.blue,
  },
  categoryItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  categoryItemText: {
    lineHeight: 2.29,
    letterSpacing: 0.4,
    fontSize: theme.appFixedDimensions.fontSize.small,
  },
});
