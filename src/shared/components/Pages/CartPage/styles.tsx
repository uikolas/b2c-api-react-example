import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  title: {
    width: '36px',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  root: {
    width: '100%',
    margin: '2%',
  },
  listWrapper: {},
  listItem: {
    display: 'flex',
  },
  imgWrapper: {
    width: '129px',
    height: '129px',
    borderRadius: '4px',
    marginRight: theme.spacing.unit * 3,
  },
  itemWrapper: {
    width: '282px',
    marginRight: '95px',
  },
  totalMsg: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  delIcon: {
    fontSize: 32,
    color: theme.palette.secondary.light,
  },
  footer: {
    margin: theme.spacing.unit * 3,
  },
});
