import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { pathCategoryComputers } from 'src/shared/constants/routes/index';
import { CategoriesTeasers } from '@components/components/CategoriesTeasers';
import { AppMain } from '@components/components/AppMain';
import { Banner } from '@components/components/Banner';

const homepageHeroSrc = require('./img/hero_image_2-min.jpg');

export const HomePageComponent: React.SFC = (): JSX.Element => (
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
