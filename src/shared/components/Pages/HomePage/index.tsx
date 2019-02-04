import * as React from 'react';
import { CategoriesTeasers } from '../../components/CategoriesTeasers';
import { AppMain } from '../../Common/AppMain';
import { Banner } from '../../components/Banner/index';
import { pathCategoryComputers } from 'src/shared/routes/categoriesRoutes';
import { FormattedMessage } from 'react-intl';

const homepageHeroSrc = require('./img/hero_image_2-min.jpg');

export const HomePage: React.SFC = () => (
    <>
        <Banner
            titleFirst={<FormattedMessage id="home.page.banner.title.first" />}
            titleSecond={<FormattedMessage id="home.page.banner.title.second" />}
            intro={<FormattedMessage id="home.page.banner.title.intro" />}
            linkPath={pathCategoryComputers}
            linkTitle={<FormattedMessage id="home.page.banner.button.title" />}
            imagePath={homepageHeroSrc}
        />
        <AppMain>
            <CategoriesTeasers />
        </AppMain>
    </>
)
