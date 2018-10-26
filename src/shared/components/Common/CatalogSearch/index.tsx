import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import { pathProductPageBase, pathSearchPage } from '../../../routes/contentRoutes';
import { AppPrice } from '../AppPrice';
import { styles } from './styles';
import { CatalogProps as Props, CatalogState as State } from './types';
import { connect } from './connect';

export const buttonTitle = 'Search';

@connect
export class CatalogSearchBase extends React.Component<Props, State> {
  public state: State = {
    value: '',
  };

  public timer: any;

  // Action handlers

  private getSuggestionValue = (suggestion: any): string => suggestion.abstract_name;

  private handleSuggestionsFetchRequested = ({value}: {value: string}) => {
    const {value: currentValue} = this.state;

    if (!this.props.isLoading && value !== currentValue) {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        if (this.state.value === value) {
          this.props.sendSuggestionAction(value);
        }
      }, 350);
    }
  };

  private handleSuggestionsClearRequested = () => {
    // if (!this.props.isLoading) {
    //   this.props.clearSuggestions(this.state.value);
    // }
  };

  private handleChange = (event: any, {newValue}: any) => {
    if (newValue.trim().length < 3) {
      this.props.clearSuggestions(newValue);
    }

    this.setState({
      value: newValue,
    });
  };

  private shouldRenderSuggestions = (value: string): boolean => value && value.trim().length > 2;

  private handleFullSearch = (e: any) => {
    e.preventDefault();
    const { value } = this.state;
    if (!this.props.isLoading && value.length > 2) {
      this.props.sendSearchAction({q: this.state.value, currency: this.props.currency, include: ''});

      this.props.push(pathSearchPage);
    }
  };

  /* Render Helpers */

  private renderInputComponent = (inputProps: any) => {
    const {classes, ref, ...other} = inputProps;

    return (
      <form action="/" method="GET" onSubmit={this.handleFullSearch}>
        <TextField
          type="text"
          variant="outlined"
          fullWidth
          InputProps={ {
            inputRef: node => ref(node),
            classes: {
              root: classes.inputRoot,
              formControl: classes.formControl,
              notchedOutline: classes.inputOutline,
              input: classes.input,
            },
            startAdornment: (
              <InputAdornment
                position="start"
                classes={{ root: classes.inputIconContainer }}
              >
                <IconButton onClick={this.handleFullSearch} aria-label="Search" type="submit">
                  <SearchIcon classes={{ root: classes.inputIcon }} />
                </IconButton>
              </InputAdornment>
            ),
          } }
          { ...other }
        />
      </form>
    );
  };

  private renderSuggestion = (suggestion: any, {query, isHighlighted}: any) => {
    const matches = match(suggestion.abstract_name, query);
    const parts = parse(suggestion.abstract_name, matches);

    return (
      <NavLink to={ `${pathProductPageBase}/${suggestion.abstract_sku}` } className={ this.props.classes.menuItem }>
        <MenuItem selected={ isHighlighted } component="div" style={ {flexGrow: 1} }>
          <span>
            { parts.map((part, index: number) => {
              return part.highlight ? (
                <span key={ String(index) } style={ {fontWeight: 500} }>
                  { part.text }
                </span>
              ) : (
                <strong key={ String(index) } style={ {fontWeight: 300} }>
                  { part.text }
                </strong>
              );
            }) }
          </span>
          <img
            width={ 30 } height={ 30 }
            src={ suggestion.images.length ? suggestion.images[0].external_url_small : '' }
            alt={ suggestion.abstract_name }
          />
          <span><AppPrice value={ suggestion.price }/></span>
        </MenuItem>
      </NavLink>
    );
  };

  private renderSuggestionsContainer = (options: any) => {
    const {categories} = this.props;

    return (
      <div { ...options.containerProps }>
        <Paper square>
          <div style={ {display: 'flex'} }>
            {
              categories.length ? (
                <div style={ {padding: '0 5px', flexGrow: 1} }>
                  <p><strong>Categories</strong></p>
                  <div>
                    { /*todo replace div with routerLinks*/ }
                    { categories.map((category, index: number) => <div key={ index }>{ category.name }</div>) }
                  </div>
                </div>
              ) : null
            }
            <div style={ {padding: '0 5px', flexGrow: 1} }>
              <p><strong>Products</strong></p>
              <div>
                { /*todo replace div with routerLinks*/ }
                { options.children }
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  };

  /* RENDER */

  public render() {
    const {classes, suggestions, isLoading} = this.props;

    const autosuggestProps = {
      suggestions,
      renderInputComponent: this.renderInputComponent,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
      renderSuggestionsContainer: this.renderSuggestionsContainer,
      shouldRenderSuggestions: this.shouldRenderSuggestions,
    };

    return (
      <div className={ classes.root } id="CatalogSearch">
        <Autosuggest
          { ...autosuggestProps }
          inputProps={ {
            classes,
            placeholder: 'What are you looking for?',
            value: this.state.value,
            onChange: this.handleChange,
          } }
          theme={ {
            container: classes.container,
            suggestionsContainer: classes.suggestionsContainer,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          } }
        />
        {/*<Button color="primary" onClick={ this.handleFullSearch } disabled={ isLoading }>*/}
          {/*{ buttonTitle }*/}
        {/*</Button>*/}
        {
          this.props.isLoading
            ? <div className={ classes.pendingProgress }><CircularProgress variant="indeterminate" size={ 34 }/></div>
            : null
        }
      </div>
    );
  }
}

const CatalogSearchComponent = withStyles(styles)(CatalogSearchBase);

export default CatalogSearchComponent;
