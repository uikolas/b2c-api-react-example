import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import {
    ICategoriesTeasersData,
    ICategoriesTeasersProps
} from './types';
import { styles } from './styles';
import { CategoryTeaser } from './CategoryTeaser/index';
import { categoriesTeasersData as teasers } from './fixtures';

export const CategoriesTeasersBase: React.SFC<ICategoriesTeasersProps> = (props): JSX.Element => {
    const {
        classes
    } = props;

    if (!teasers || !Array.isArray(teasers) || !teasers.length) {
        return null;
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.container}>
                {teasers.map((teaser: ICategoriesTeasersData, index: number) =>
                    (
                        <CategoryTeaser
                            key={teaser.title}
                            title={teaser.title}
                            text={teaser.text}
                            img={teaser.img}
                            path={teaser.path}
                            linkTitle={teaser.linkTitle}
                            isOdd={Boolean(index % 2)}
                        />
                    ))}
            </Grid>
        </Grid>
    );
};

export const CategoriesTeasers = withStyles(styles)(CategoriesTeasersBase);
