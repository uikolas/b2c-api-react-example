import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import {styles} from './styles';
import {IHomePageProps, IHomePageState} from "./types";
import {connect} from './connect';
import {categoriesTeasersData} from "./constants/categoriesTeasersData";
import {CategoriesTeasers} from "./CategoriesTeasers";
import {AppMain} from '../../Common/AppMain';
import {Banner} from "src/shared/components/Pages/HomePage/Banner/index";
import {pathCategoryComputers} from "src/shared/routes/categoriesRoutes";
import { FormattedMessage } from 'react-intl';

@connect
export class HomePageBase extends React.Component<IHomePageProps, IHomePageState> {

  public state: IHomePageState = {};

  public render() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <Banner
          titleFirst={<FormattedMessage id='home.page.banner.title.first' />}
          titleSecond={<FormattedMessage id='home.page.banner.title.second' />}
          intro={<FormattedMessage id='home.page.banner.title.intro' />}
          linkPath={pathCategoryComputers}
          linkTitle={<FormattedMessage id='home.page.banner.button.title' />}
        />
        <AppMain>
          <CategoriesTeasers teasers={categoriesTeasersData} />
        </AppMain>
      </React.Fragment>
    );
  }
}

export const HomePage = withStyles(styles)(HomePageBase);
export default HomePage;
