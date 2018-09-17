import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  pageHeader: {
    marginBottom: theme.spacing.unit * 8,
  },
  heroBlock: {
    backgroundImage: 'url("https://now.spryker.com/hubfs/Events/duotone_Events.jpg?t=1537192687999")',
    backgroundColor: "red",
    backgroundSize: "cover",
    height: "700px",
  },
  contentBlock: {
    minHeight: "400px",
    backgroundColor: "#d8d1d1",
  },
  footerBlock: {
    minHeight: "200px",
    backgroundColor: "#7979ce",
  }
});
