import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { grey } from '@material-ui/core/colors';

export const styles = (theme: Theme) => createStyles({
  strikethrough: {
    textDecoration: 'line-through',
    fontSize: 12,
    color: grey[600],
  },
});
