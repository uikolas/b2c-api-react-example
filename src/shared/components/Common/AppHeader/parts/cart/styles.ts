import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  badge: {
    transition: 'transform .3s ease-in-out',
    background: theme.appColors.saleLabel,
    width: 'auto',
    minWidth: 18,
    right: 'auto',
    left: '100%',
    padding: 4,
    height: 18,
    fontSize: '11px',
    lineHeight: '14px',
  },
  hideBadge: {
    transform: 'scale(0)',
  },
  cartDrop: {
    width: 418,
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
  cartDropProductsList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    fontSize: 14,
    lineHeight: '18px',
    '& li': {
      borderBottom: '1px solid #d8d8d8',
    },
    '& a': {
      color: theme.appColors.black,
      textDecoration: 'none',
      display: 'block',
      padding: '24px 0',
    }
  },
  cartTotal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 16,
    lineHeight: '20px',
    fontWeight: 'bold',
    padding: '16px 0',
    borderBottom: '1px solid #d8d8d8',
    marginBottom: 24,
  },
  cartBtns: {
    display: 'flex',
    '& a': {
      flex: 1,
      '&:not(:last-child)': {
        marginRight: 12
      }
    }
  }
});
