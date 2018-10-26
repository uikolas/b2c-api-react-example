import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  productItem: {
    display: 'flex',
    alignItems: 'stretch'
  },
  image: {
    width: 100,
    display: 'flex',
    alignItems: 'center',
    '& img': {
      display: 'block',
      width: '100%',
      maxHeight: '100%',
    }
  },
  rowsContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  name: {},
  price: {},
  bottomRow: {},
  quantity: {},
  btnRemove: {}
});
