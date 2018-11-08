import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { rgba } from 'src/shared/helpers/common/hextorgba';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  button: {
    margin: '0 7px 7px 0',
    textTransform: 'uppercase',
    fontSize: 14,
    '&:last-child': {
      marginRight: 'auto',
    },
  },
  buttonSelected: {
    pointerEvents: 'none',
    borderColor: theme.appColors.blue,
    color: theme.appColors.blue,
    background: rgba(theme.appColors.blue, .1),
  },
});
