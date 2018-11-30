import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  productItem: {
    display: 'flex',
    alignItems: 'stretch',
    padding: '15px 0',
  },
  image: {
    padding: 10,
    background: theme.appColors.lightGrey,
    borderRadius: 4,
    '& img': {
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },
  imageContainer: {
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowsContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
  btnRemove: {
    marginLeft: '-16px'
  },
});
