import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  badge: {
    transition: 'transform .3s ease-in-out',
    background: theme.appColors.blue,
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
});
