import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    borderBottom: `1px solid ${theme.appColors.blockDivider}`,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit,
  },
  productInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  priceBlock: {
    display: 'flex',
    alignItems: 'baseline',
    flexGrow: 1,
    '& > *': {
      marginRight: '8px !important',
      display: 'block',
    }
  },
  price: {
    color: theme.appColors.black,
    fonsSize: '24px',
    lineHeight: '28px',
  },
  oldPrice: {
    color: theme.appColors.grey,
    fontSize: '14px',
    lineHeight: '18px',
    margin: 0,
  },
  vat: {
    color: theme.appColors.grey,
    fontSize: '14px',
    lineHeight: '18px',
    margin: 0,
  }
});
