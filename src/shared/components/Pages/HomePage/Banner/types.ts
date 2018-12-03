import {WithStyles} from '@material-ui/core/styles/withStyles';
import {bannerStyles} from "./styles";


export interface IBannerProps extends WithStyles<typeof bannerStyles> {
  titleFirst: string;
  titleSecond?: string;
  intro: string;
  linkPath: string;
  linkTitle: string;
}
