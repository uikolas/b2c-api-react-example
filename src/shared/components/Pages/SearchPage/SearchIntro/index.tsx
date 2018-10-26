import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import { styles } from './styles';
import {TSpellingSuggestion} from "src/shared/interfaces/searchPageData/index";

interface SearchIntroProps extends WithStyles<typeof styles> {
  className: string;
  spellingSuggestion: TSpellingSuggestion | null;
}

export const pageIntroText = 'Did you mean ';

export const SearchIntroBase: React.SFC<SearchIntroProps> = (props) => {
  const {classes, className, spellingSuggestion} = props;

  if(!spellingSuggestion) {
    return null;
  }
  return (
    <React.Fragment>
      {pageIntroText}
      <span className={className}>{spellingSuggestion}</span> ?
    </React.Fragment>
  );

};

export const SearchIntro = withStyles(styles)(SearchIntroBase);
