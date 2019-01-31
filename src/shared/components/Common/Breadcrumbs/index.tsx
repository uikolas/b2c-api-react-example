import * as React from 'react';
import { pathCategoryPageBase, pathHomePage } from '@routes/contentRoutes';
import { NavLink } from 'react-router-dom';
import { ICategoryForBreadcrumbs } from 'src/shared/interfaces/category';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';

interface IBreadcrumbst extends WithStyles<typeof styles> {
    breadcrumbsList: ICategoryForBreadcrumbs[];
}

export const BreadcrumbsBase: React.SFC<IBreadcrumbst> = props => {
    const {breadcrumbsList, classes} = props;

    return (
        <ul className={classes.list}>
            <li className={classes.item}>
                <NavLink className={classes.link} to={pathHomePage}>Home</NavLink>
                {breadcrumbsList &&
                    <span className={classes.separator}></span>
                }
            </li>
            {breadcrumbsList &&
                breadcrumbsList.map((value: ICategoryForBreadcrumbs) => {
                    const {name, nodeId, current} = value;
                    const currentClassName = current ? classes.current : null;

                    return (
                        <li className={classes.item} key={`${name}${nodeId}`}>
                            <NavLink
                                className={`${classes.link} ${currentClassName}`}
                                to={`${pathCategoryPageBase}/${nodeId}`}>
                                {name}
                            </NavLink>
                            {!current &&
                                <span className={classes.separator}></span>
                            }
                        </li>
                    );
                })
            }
        </ul>
    );
};

export const Breadcrumbs = withStyles(styles)(BreadcrumbsBase);
