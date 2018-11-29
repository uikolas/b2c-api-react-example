import {WithStyles} from '@material-ui/core/styles/withStyles';
import {appBtnLinkStyles} from "./appBtnLinkStyles";


export interface IAppBtnLinkProps extends WithStyles<typeof appBtnLinkStyles> {
  title: string;
  path: string;
  extraClassName?: string;
}
