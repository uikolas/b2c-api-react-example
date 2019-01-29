import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ISearchIntroProps } from 'src/shared/components/Pages/SearchPage/SearchIntro/types';
import { FormattedMessage } from 'react-intl';


export const SearchIntroBase: React.SFC<ISearchIntroProps> = (props) => {
    const {className, spellingSuggestion} = props;

    if (!spellingSuggestion) {
        return null;
    }
    return (
        <React.Fragment>
            <FormattedMessage id={'category.suggestion.title'} />
            <span className={className}>{spellingSuggestion}</span> ?
        </React.Fragment>
    );

};

export const SearchIntro = withStyles(styles)(SearchIntroBase);
