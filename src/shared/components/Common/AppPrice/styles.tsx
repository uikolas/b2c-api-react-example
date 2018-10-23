import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  strikethrough: {
    textDecoration: 'line-through',
    color: theme.appColors.oldPrice,
    fontSize: "0.85rem",
    letterSpacing: "0.2px",
  },
  defaultPrice: {
    fontSize: "1.25rem",
    fontWeight: 600,
  },
});
