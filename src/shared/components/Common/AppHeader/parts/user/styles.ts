import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  userDrop: {
    width: 340,
    padding: 24,
    border: '1px solid #d8d8d8',
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.05)',
  },
  title: {
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: 'bold',
    color: theme.appColors.black,
    letterSpacing: '-.5px',
    margin: '0 0 10px',
    borderBottom: '1px solid #d8d8d8',
    paddingBottom: 10,
    '& strong': {
      fontWeight: 400,
    }
  },
  userDropNav: {
    listStyle: 'none',
    margin: 0,
    padding: '24px 0',
    '& li': {
      marginBottom: 10,
    },
    '& a': {
      color: theme.appColors.black,
      textDecoration: 'none'
    }
  },
  userBtns: {
    display: 'flex',
    '& a': {
      flex: 1,
      '&:not(:last-child)': {
        marginRight: 12
      }
    }
  }
});
