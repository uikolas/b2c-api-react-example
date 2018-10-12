import * as React from "react";
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { push } from 'react-router-redux';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import {RouteProps} from "react-router";

import {reduxify} from '../../../lib/redux-helper';
import {SearchState} from '../../../reducers/Pages/Search';
import {IProductCard} from '../../../interfaces/product';

import {styles} from './styles';
import {sendSearchAction, sendSuggestionAction, clearSuggestions} from '../../../actions/Pages/Search';
import {getProductDataAction} from "../../../actions/Pages/Product";
import {getAppCurrency, TAppCurrency} from "../../../reducers/Common/Init";
import {AppPrice} from "../AppPrice/index";
import {pathProductPage, pathProductPageBase, pathSearchPage} from "../../../routes/contentRoutes";

interface CatalogProps extends WithStyles<typeof styles>, RouteProps {
  dispatch?: Function;
  suggestions?: Array<IProductCard>;
  searchTerm?: string;
  currency: TAppCurrency;
  isLoading?: boolean;
  getSuggestions?: Function;
  getSearchResult?: Function;
  getProductData?: Function;
  changeLocation?: Function;
}

interface CatalogState {
  value: string;
}

export const buttonTitle = 'Search';

export class CatalogSearchBase extends React.Component<CatalogProps, CatalogState> {
  public state: CatalogState = {
    value: '',
  }

  public timer: any

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
          src={suggestion.images.length ? suggestion.images[0].external_url_small : ''} alt={suggestion.abstract_name}
        />
        <span><AppPrice value={suggestion.price}/></span>
      </MenuItem>
    );
  }

  private getSuggestionValue(suggestion: any): string {
    return suggestion.abstract_name;
  }

  public handleSuggestionsFetchRequested = ({ value }: {value: string}) => {
    const { value: currentValue } = this.state;

    if (!this.props.isLoading && value != currentValue) {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        if (this.state.value === value) {
          this.props.getSuggestions(value);
        }
      }, 350);
    }
  }

  private handleSuggestionsClearRequested = () => {
    // if (!this.props.isLoading) {
    //   this.props.dispatch(clearSuggestions(this.state.value));
    // }
  }

  private  handleChange = (event: any, { newValue }: any) => {
    if (newValue.trim().length < 3) {
      this.props.dispatch(clearSuggestions(newValue));
    }

    this.setState({
      value: newValue,
    });
  }

  private shouldRenderSuggestions = (value: string): boolean => value && value.trim().length > 2;

  private onSuggestionSelected = (event: any, { suggestion }: {suggestion: any}) => {
    //this.props.getProductData(suggestion.abstract_sku);
    this.props.changeLocation(`${pathProductPageBase}/${suggestion.abstract_sku}`);
  }

  private handleFullSearch = (e: any) => {
    e.preventDefault();
    if (!this.props.isLoading) {
      this.props.getSearchResult({q: this.state.value, currency: this.props.currency, include: ''});
      this.props.changeLocation(`${pathSearchPage}`);
    }
  }

  public render() {
    const { classes, suggestions, location, isLoading } = this.props;

    const autosuggestProps = {
      suggestions,
      renderInputComponent: this.renderInputComponent,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
      shouldRenderSuggestions: this.shouldRenderSuggestions,
      onSuggestionSelected: this.onSuggestionSelected,
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
        <Button color="primary" onClick={this.handleFullSearch} disabled={isLoading}>
          {buttonTitle}
        </Button>
        {
          this.props.isLoading
            ? <div className={classes.pendingProgress}><CircularProgress variant="indeterminate" size={34} /></div>
            : null
        }
      </div>
    );
  }
}

const CatalogSearch = withStyles(styles)(CatalogSearchBase);

const CatalogSearchComponent = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const searchProps: SearchState = state.pageSearch ? state.pageSearch : null;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        suggestions: searchProps && searchProps.data.suggestions ? searchProps.data.suggestions : ownProps.suggestions,
        searchTerm: searchProps && searchProps.data.searchTerm ? searchProps.data.searchTerm : ownProps.searchTerm,
        isLoading: searchProps && searchProps.pending ? searchProps.pending : ownProps.pending,
        currency,
      }
    );
  },
  (dispatch: Function) => ({
    dispatch,
    getSuggestions: (query: string) => dispatch(sendSuggestionAction(query)),
    getSearchResult: (params: any) => dispatch(sendSearchAction(params)),
    getProductData: (sku: string) => dispatch(getProductDataAction(sku)),
    changeLocation: (location: string) => dispatch(push(location)),
  })
)(CatalogSearch);

export default CatalogSearchComponent;
