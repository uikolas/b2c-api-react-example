import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const formStyles = (theme: Theme) => createStyles({
  root: {},
  shipmentMethodsParentForms: {
    "& form": {
      marginBottom: theme.spacing.unit * 3,
    },
    "& form:last-child": {
      marginBottom: 0,
    },
    "& label": {
      minWidth: 130,
      height: 70,
      alignItems: "flex-start",
      "&>span:not(:first-child)": {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }
    },
    "& legend svg": {
      height: 15,
      minWidth: 100,
    }
  },
});
