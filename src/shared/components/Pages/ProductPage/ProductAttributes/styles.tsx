import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
  },
  value: {
    display: 'inline',
  },
  element: {
    paddingBottom: theme.spacing.unit * 2,
  },
  attributesTitle: {
    fontSize: 34,
    margin: '0 0 38px',
  },
  valuesBlock: {
    fontSize: 16,
    '& strong': {
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    '& p': {
      margin: 0,
    },
  },
});
