import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { pathCategoryPageBase, pathSearchPage } from '@routes/contentRoutes';
import SearchIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { getCategoryIdByName } from '@helpers/categories';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import { FormattedMessage } from 'react-intl';
import Divider from '@material-ui/core/Divider/Divider';
import { ClickEvent } from '@interfaces/common/react';
import { connect } from './connect';

@connect
export class SuggestionsContainer extends React.Component<any, any> {
    public state: any = {

    };

    private handleSearchCompletion = (e: ClickEvent): void => {
        const query = e.currentTarget.dataset.query.trim();
        this.props.sendSearchAction({q: query, currency: this.props.currency});
        this.props.clearSuggestion(query);
    };

    public render() {
        const {categories, completion, suggestions, categoriesTree, classes, options} = this.props;
        let suggestQuery: string = options.query.trim();

        if (completion.length) {
            completion.some((data: string) => {
                if (data.startsWith(options.query.trim().toLowerCase())) {
                    suggestQuery = data;

                    return true;
                }

                return false;
            });
        }

        const completions: JSX.Element[] = [];
        const renderedCategories: JSX.Element[] = [];

        for (let i = 0; i < 4; i++) {
            if (completion[i]) {
                completions.push(
                    <NavLink
                        to={pathSearchPage}
                        data-query={completion[i]}
                        key={`completion-${i}`}
                        className={classes.completion}
                        onClick={this.handleSearchCompletion}
                    >
                        <SearchIcon />
                        <span>{completion[i]}</span>
                    </NavLink>
                );
            }
        }

        for (let i = 0; i < 4; i++) {
            if (categories[i]) {
                const categoryNodeId = getCategoryIdByName(categories[i].name, categoriesTree);
                const path = categoryNodeId ? `${pathCategoryPageBase}/${categoryNodeId}` : pathSearchPage;
                renderedCategories.push(
                    <NavLink to={path}
                             data-name={categories[i].name}
                             data-nodeid={categoryNodeId}
                             key={`category-${categoryNodeId}`}
                             className={classes.completion}
                             onClick={() => this.props.clearSuggestion(categories[i].name)}
                    >
                        <div className={classes.completion}>{categories[i].name}</div>
                    </NavLink>
                );
            }
        }

        if (!suggestions.length) {
            return (
                <div {...options.containerProps}>
                    <Paper square>
                        <Typography paragraph variant="headline">
                            <FormattedMessage id={'no.found.message'} />
                        </Typography>
                    </Paper>
                </div>
            );
        }

        return (
            <div {...options.containerProps}>
                <div className={classes.insideContWrapper}>
                    <div>{completions}</div>
                    <Typography component="h4" className={classes.categoryTitle}>
                        <FormattedMessage id={'categories.panel.title'} />
                    </Typography>

                    <Divider />

                    <div className={classes.marginTop}>{renderedCategories}</div>
                    <Typography component="h4" className={classes.categoryTitle}>
                        <FormattedMessage id={'suggested.products.title'} />
                    </Typography>

                    <Divider />

                    <div>{options.children}</div>

                    <NavLink
                        to={pathSearchPage}
                        data-query={options.query}
                        onClick={this.handleSearchCompletion}
                        className={classes.linkAll}
                    >
                        <FormattedMessage id={'all.suggested.products.title'} />
                    </NavLink>
                </div>
            </div>
        );
    }
}
