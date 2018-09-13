import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  card: {
    maxWidth: 350,
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    height: '100%',
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'contain',
    height: '12rem',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
});
