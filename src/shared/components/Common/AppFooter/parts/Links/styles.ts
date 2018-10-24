import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  title: {
    textTransform: 'uppercase',
    margin: 0,
  },
  linkList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  linkItem: {},
  link: {
    textDecoration: 'none',
    color: '#000',
  },
});
