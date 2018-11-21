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
      minHeight: 70,
      alignItems: "flex-start",
      "&>span:not(:first-child)": {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 1.5,
        "&>*": {
          marginBottom: theme.spacing.unit,
          lineHeight: 1,
          "&:last-child": {
            marginBottom: 0,
          },
        },
      },
    },
    "& legend svg": {
      height: 15,
      minWidth: 100,
      "& path": {
        fill: theme.appColors.black,
        opacity: 1,
      },
    }
  },
  paymentMethodsParentForms: {
    "& form": {
      "& label": {
        width: `calc(50% - ${theme.spacing.unit * 1.5}px)`,
        minHeight: 44,
        alignItems: "flex-start",

        [theme.breakpoints.down('xs')]: {
          width: "100%",
        },

        "&:nth-child(odd)": {
          marginRight: theme.spacing.unit * 1.5,
          marginLeft: 0,
          [theme.breakpoints.down('xs')]: {
            marginRight: 0,
          },
        },
        "&:nth-child(even)": {
          marginLeft: theme.spacing.unit * 1.5,
          marginRight: 0,
          [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
          },
        },
        "&>span:not(:first-child)": {
          height: "100%",
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          "&>:first-child": {
            flexGrow: 1,
          },
          "& svg": {
            height: "70%",
            width: 40,
            "&:not(:last-child)": {
              marginRight: theme.spacing.unit * 1.25,
            },
            "& path": {
              fill: theme.appColors.black,
              opacity: 1,
            },
          }
        },
      },
    },
  },
});
