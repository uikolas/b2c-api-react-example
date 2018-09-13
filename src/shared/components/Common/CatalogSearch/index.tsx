import * as React from "react";
import {Location} from 'history';
import { toast } from 'react-toastify';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import {reduxify} from '../../../lib/redux-helper';
import {SearchState} from '../../../reducers/Pages/Search';
import {sendSearchAction} from '../../../actions/Pages/Search';
import {IProductCard} from '../../../interfaces/productCard';
import {styles} from './styles';

interface CatalogProps extends WithStyles<typeof styles> {
  dispatch?: Function;
  location?: Location;
  items: Array<IProductCard>;
}

interface CatalogState {
  value: string;
  suggestions: Array<object>;
}

class CatalogSearch extends React.Component<CatalogProps, CatalogState> {
  public state: CatalogState = {
    value: '',
    suggestions: []
  };

  public componentDidMount() {
    this.props.dispatch(sendSearchAction('sams'));
  }

  private renderInputComponent = (inputProps: any) => {
    const { classes, ref, ...other } = inputProps;

    return (
      <TextField
        type="text"
        fullWidth
        InputProps={{
          inputRef: node => {
            ref(node);
          },
          classes: {
            input: classes.input,
          },
        }}
        {...other}
      />
    );
  }

  private renderSuggestion = (suggestion: any, { query, isHighlighted }: any) => {
    const matches = match(suggestion.abstract_name, query);
    const parts = parse(suggestion.abstract_name, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around'}}>
          {parts.map((part, index: number) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
          <img
            width={30} height={30}
            src={`http://${suggestion.images[0].external_url_small}`} alt={suggestion.abstract_name}
          />
          <span>{suggestion.price}</span>
        </div>
      </MenuItem>
    );
  }

  private getSuggestionValue(suggestion: any): string {
    return suggestion.abstract_name;
  }

  public handleSuggestionsFetchRequested = ({ value }: any) => {
    console.info(value);
    this.props.dispatch(sendSearchAction(value));
  }

  private handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  private  handleChange = (event: any, { newValue }: any) => {
    this.setState({
      value: newValue,
    });
  }

  private shouldRenderSuggestions = (value: string): boolean => value.trim().length > 2

  public render() {
    const { classes, items } = this.props;

    const autosuggestProps = {
      // suggestions: this.state.suggestions,
      suggestions: items,
      renderInputComponent: this.renderInputComponent,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
      shouldRenderSuggestions: this.shouldRenderSuggestions,
    }

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Search ...',
            value: this.state.value,
            onChange: this.handleChange,
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={(options: any) => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        <Button variant="outlined">
          Search
        </Button>
      </div>
    );
  }
}

const DecoratedCatalog = withStyles(styles)(CatalogSearch);

const CatalogSearchComponent = reduxify(
  (state: any, ownProps: any) => {
    const searchProps: SearchState = state.pageSearch ? state.pageSearch : null;
    return (
      {
        items: searchProps && searchProps.data.items ? searchProps.data.items : ownProps.items,
        searchTerm: searchProps && searchProps.data.searchTerm ? searchProps.data.searchTerm : ownProps.searchTerm,
        currency: searchProps && searchProps.data.currency ? searchProps.data.currency : ownProps.currency,
      }
    );
  }
)(DecoratedCatalog);

export default CatalogSearchComponent;
