import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import { pathProductPageBase, pathSearchPage } from 'src/shared/routes/contentRoutes';
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
    if (newValue.trim().length < 4) {
      this.props.clearSuggestions(newValue);
    }

    this.setState({
      value: newValue,
    });
  };

  private handleFullSearch = (e: any) => {
    e.preventDefault();
    if (!this.props.isLoading) {
      this.props.sendSearchAction({q: this.state.value, currency: this.props.currency, include: ''});

      this.props.push(pathSearchPage);
    }
  };

  private handleSearchCompletion = (e: any) => {
    const query = e.currentTarget.dataset.query.trim();
    this.setState({value: query});
    this.props.sendSearchAction({q: query, currency: this.props.currency, include: ''});
  };

  /* Render Helpers */

  private shouldRenderSuggestions = (value: string): boolean => value && value.trim().length > 2;

  private renderInputComponent = (inputProps: any) => {
    const {classes, ref, ...other} = inputProps;

    return (
      <TextField
        type="text"
        fullWidth
        InputProps={ {
          inputRef: node => {
            ref(node);
          },
          classes: {
            input: classes.input,
          },
        } }
        { ...other }
      />
    );
  };

  private renderSuggestion = (suggestion: any, {query, isHighlighted}: any) => {
    const matches = match(suggestion.abstract_name, query);
    const parts = parse(suggestion.abstract_name, matches);
    const { classes } = this.props;

    return (
      <NavLink to={ `${pathProductPageBase}/${suggestion.abstract_sku}` }>
        <MenuItem selected={ isHighlighted } component="div" className={classes.menuItem}>
          <div className={classes.imgWrapper}>
            <img
              height={ 60 }
              src={ suggestion.images.length ? suggestion.images[0].external_url_small : '' }
              alt={ suggestion.abstract_name }
            />
            <div className={ classes.actionAreaOverlay }></div>
          </div>
          <div className={ classes.description }>
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

            <span><AppPrice value={ suggestion.price }/></span>
          </div>
        </MenuItem>
      </NavLink>
    );
  };

  private renderSuggestionsContainer = (options: any) => {
    const {categories, completion, classes} = this.props;
    let suggestQuery = options.query.trim();

    if (completion.length) {
      completion.some((data: string) => {
        if (data.startsWith(options.query.trim().toLowerCase())) {
          suggestQuery = data;
          return true;
        }

        return false;
      });
    }
    const matches = match(suggestQuery, options.query);
    const parts = parse(suggestQuery, matches);

    const completions: any[] = [];
    const renderedCategories: any[] = [];

    for (let i = 0; i < 4; i++) {
      if (completion[i]) {
        completions.push(
          <NavLink to={pathSearchPage}
            data-query={completion[i]}
            key={`completion-${i}`}
            className={classes.completion}
            onClick={this.handleSearchCompletion}
          >
            <SearchIcon/>
            <span>{completion[i]}</span>
          </NavLink>
        );
      }
    }

    for (let i = 0; i < 4; i++) {
      if (categories[i]) {
        renderedCategories.push(
          <NavLink to={pathSearchPage}
                   data-query={categories[i].name}
                   key={`category-${i}`}
                   className={classes.completion}
                   onClick={this.handleSearchCompletion}
          >
            <div className={classes.completion}>{ categories[i].name }</div>
          </NavLink>
        );
      }
    }

    return (
      <div { ...options.containerProps }>
        <Paper square>
          <Typography paragraph variant="headline">
            { parts.map((part, index: number) => {
                return part.highlight ? (
                  <span key={ String(index) } style={ {fontWeight: 500} }>
                    { part.text }
                  </span>
                ) : (
                  <strong key={ String(index) } style={ {fontWeight: 300, color: '#D3D3D3'} }>
                    { part.text }
                  </strong>
                );
              })
            }
          </Typography>
          <div className={classes.insideWrapper}>
            <div>
              {completions}
            </div>
            <Typography variant="title" className={classes.marginTop}>
              Categories
            </Typography>
            <Divider/>
            <div className={classes.marginTop}>
              {renderedCategories}
            </div>
            <Typography variant="title" className={classes.marginTop}>
              Suggested Products
            </Typography>
            <Divider/>
            <div className={classes.marginTop}>
              {
                options.children
              }
            </div>
            <NavLink to={pathSearchPage}
                     data-query={options.query}
                     onClick={this.handleSearchCompletion}
            >
              <strong>See all suggested products</strong>
            </NavLink>
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
            placeholder: 'Search ...',
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
        <Button color="primary" onClick={ this.handleFullSearch } disabled={ isLoading }>
          { buttonTitle }
        </Button>
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
