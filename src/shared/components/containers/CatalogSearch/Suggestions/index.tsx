import * as React from 'react';
import { pathProductPageBase } from '@routes/contentRoutes';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { SquareImage } from '@components/Common/SquareImage';
import { AppPrice } from '@components/Common/AppPrice';
import { NavLink } from 'react-router-dom';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { ISuggestionsProps as Props, ISuggestionsState as State } from './types';
import { ICompletionMatch } from '../types';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export class SuggestionsBase extends React.Component<Props, State> {
    private designImgWidth: number = 0.23;

    public state: State = {
        heightListItem: 100
    };

    public componentDidMount() {
        window.addEventListener('resize', this.setListItemHeight);
        this.setListItemHeight();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.setListItemHeight);
    }

    private setListItemHeight = (): void => {
        const {containerRef} = this.props;

        if (containerRef && containerRef.current) {
            this.setState({
                heightListItem: containerRef.current.offsetWidth * this.designImgWidth
            });
        }
    };

    public render() {
        const {suggestion, classes, isHighlighted, query, clearSuggestion} = this.props;
        const {heightListItem} = this.state;
        const matches = match(suggestion.abstractName, query);
        const parts = parse(suggestion.abstractName, matches);

        return (
            <NavLink
                to={`${pathProductPageBase}/${suggestion.abstractSku}`}
                style={{textDecoration: 'none'}}
                onClick={() => clearSuggestion(suggestion.abstractName)}
            >
                <MenuItem selected={isHighlighted} component="div" className={classes.menuItem}>
                    <SquareImage
                        image={suggestion.images.length ? suggestion.images[0].externalUrlSmall : ''}
                        size={Number(heightListItem)}
                        alt={suggestion.abstractName}
                    />

                    <div className={classes.description}>
                        <span className={classes.itemName}>
                            {parts.map((part: ICompletionMatch, index: number) => (part.highlight ? (
                                <span key={String(index)} style={{fontWeight: 500}}>
                                        {part.text}
                                    </span>
                            ) : (
                                <strong key={String(index)} style={{fontWeight: 300}}>
                                    {part.text}
                                </strong>
                            )))}
                        </span>

                        <AppPrice
                            value={
                                suggestion.prices && suggestion.prices.length
                                    ? suggestion.prices[0].grossAmount
                                    : suggestion.price
                            }
                            priceType={
                                suggestion.prices && suggestion.prices.length
                                    ? suggestion.prices[0].priceTypeName
                                    : ''
                            }
                            extraClassName={classes.mainPrice}
                        />

                        {suggestion.prices && suggestion.prices.length > 1 ? (
                            <AppPrice
                                value={suggestion.prices[1].grossAmount}
                                priceType={suggestion.prices[1].priceTypeName}
                                extraClassName={classes.oldPrice}
                            />
                        ) : null}
                    </div>
                </MenuItem>
            </NavLink>
        );
    }
}

export const Suggestions = withStyles(styles)(SuggestionsBase);
