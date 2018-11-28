import { WithStyles } from '@material-ui/core/styles/withStyles';
import {homePageStyles} from "src/shared/components/Pages/HomePage/homePageStyles";


export interface IHomePageProps extends WithStyles<typeof homePageStyles> {

}

export interface IHomePageState {
}

export interface ICategoriesTeasersData {
  title: string;
  text: string;
  img: string;
  path: string;
  linkTitle: string;
}
