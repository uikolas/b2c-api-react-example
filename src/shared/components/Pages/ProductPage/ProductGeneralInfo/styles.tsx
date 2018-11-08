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
  },
  price: {
    color: '#b12704',
    fonsSize: '24px',
    lineHeight: '28px',
    margin: '0 8px 0 0',
  },
  oldPrice: {
    color: theme.appColors.grey,
    fonsSize: '14px',
    lineHeight: '18px',
    margin: 0,
  },
});
