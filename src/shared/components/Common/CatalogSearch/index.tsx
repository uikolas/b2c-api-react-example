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
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from 'react-router-dom';
import {RouteProps} from "react-router";

import {reduxify} from '../../../lib/redux-helper';
import {SearchState} from '../../../reducers/Pages/Search';
import {sendSearchAction, clearSuggestions, setItemsFromSuggestions} from '../../../actions/Pages/Search';
import {IProductCard} from '../../../interfaces/productCard';
import {getFormattedPrice} from '../../../services/priceFormatter';
import {styles} from './styles';

interface CatalogProps extends WithStyles<typeof styles>, RouteProps {
  dispatch?: Function;
  suggestions?: Array<IProductCard>;
  searchTerm?: string;
  currency?: string;
  isLoading?: boolean;
}

interface CatalogState {
  value: string;
}

export const buttonTitle = 'Search';

export class CatalogSearchBase extends React.Component<CatalogProps, CatalogState> {
  public state: CatalogState = {
    value: '',
  };

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
      <MenuItem className={this.props.classes.menuItem} selected={isHighlighted} component="div">
        <span>
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
        </span>
        <img
          width={30} height={30}
          src={suggestion.images[0].external_url_small} alt={suggestion.abstract_name}
        />
        <span>{getFormattedPrice(suggestion.price, this.props.currency)}</span>
      </MenuItem>
    );
  }

  private getSuggestionValue(suggestion: any): string {
    return suggestion.abstract_name;
  }

  public handleSuggestionsFetchRequested = ({ value }: {value: string}) => {
    this.props.dispatch(sendSearchAction(value));
  }

  private handleSuggestionsClearRequested = () => {
    this.props.dispatch(clearSuggestions(this.state.value));
  }

  private  handleChange = (event: any, { newValue }: any) => {
    this.setState({
      value: newValue,
    });

    if (newValue.trim().length < 3) {
      this.props.dispatch(clearSuggestions(newValue));
    }
  }

  private shouldRenderSuggestions = (value: string): boolean => value && value.trim().length > 2;

  private renderSuggestionsContainer = ({ containerProps , children, query }: any) => {
    if (this.props.isLoading) {
      console.info(containerProps);
      return <div {... containerProps} style={{height: '100px', width: '100%'}}><CircularProgress /></div>;
    }

    return (
      <div {... containerProps}>
        {children}
      </div>
    );
  }

  private handleEndSearch = () => {
    this.props.dispatch(setItemsFromSuggestions());
  }

  public render() {
    const { classes, suggestions } = this.props;

    const autosuggestProps = {
      suggestions,
      renderInputComponent: this.renderInputComponent,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
      shouldRenderSuggestions: this.shouldRenderSuggestions,
      // renderSuggestionsContainer: this.renderSuggestionsContainer,
    };

    return (
      <div className={classes.root} id="CatalogSearch">
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
        <NavLink to="/search">
          <Button variant="contained" onClick={this.handleEndSearch}>
            {buttonTitle}
          </Button>
        </NavLink>
      </div>
    );
  }
}

const CatalogSearch = withStyles(styles)(CatalogSearchBase);

const CatalogSearchComponent = reduxify(
  (state: any, ownProps: any) => {
    const searchProps: SearchState = state.pageSearch ? state.pageSearch : null;
    return (
      {
        suggestions: searchProps && searchProps.data.suggestions ? searchProps.data.suggestions : ownProps.suggestions,
        searchTerm: searchProps && searchProps.data.searchTerm ? searchProps.data.searchTerm : ownProps.searchTerm,
        currency: searchProps && searchProps.data.currency ? searchProps.data.currency : ownProps.currency,
        isLoading: searchProps && searchProps.pending ? searchProps.pending : ownProps.pending,
      }
    );
  }
)(CatalogSearch);

export default CatalogSearchComponent;
