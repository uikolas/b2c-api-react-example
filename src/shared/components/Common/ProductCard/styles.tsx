import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    height: '100%',
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'contain',
    //height: '12rem',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  actionArea: {
    maxWidth: theme.appFixedDimensions.card.actionAreaWidth,
    minHeight: theme.appFixedDimensions.card.actionAreaHeight,
    borderRadius: theme.appFixedDimensions.borderRadius,
    backgroundColor: theme.appColors.lightGrey,
  },
});
