import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: '90%',
    marginLeft: '5%',
  },
  button: {
    display: 'block',
    marginLeft: theme.spacing.unit,
    paddingLeft: 0,
    paddingRight: 0,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  chip: {
    margin: theme.spacing.unit / 2,
    display: 'flex',
    justifyContent: 'space-between',
  },
  rangeFilterName: {
    maxWidth: '40%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize',
    marginRight: theme.spacing.unit,
    fontSize: '1.2rem',
    color: theme.palette.primary.light,
  },
  padRight: {
    marginRight: theme.spacing.unit,
  },
});
