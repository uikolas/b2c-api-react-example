import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {

  },
  header: {
    backgroundColor: theme.appColors.lightGrey
  },
  headerRow: {
    height: 'auto'
  },
  headerCell: {
    padding: '0.875rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: theme.palette.common.black,
    borderBottom: 'none'
  },
  body: {

  },
  bodyRow: {
    height: 'auto',
  },
  rowHover: {
    transition: 'background-color 0.5s ease-in-out',
    '&:hover': {
      backgroundColor: theme.appColors.lightGrey
    }
  },
  bodyCell: {
    padding: '1.4375rem 1rem',
    fontSize: '0.875rem',
  },
  footerCell: {

  }
});
