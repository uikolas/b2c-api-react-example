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
import {ILoginState} from '../../../reducers/Pages/Login';
import {sendLoginAction, customerRegisterAction} from '../../../actions/Pages/Login';
import {styles} from './styles';

interface CatalogProps extends WithStyles<typeof styles> {
  dispatch?: Function;
  location?: Location;
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
    this.setState({
      suggestions: [
        {
          "abstract_sku": "070",
          "abstract_name": "Samsung Galaxy Ace",
          "price": 29678,
          "images": [
            {
              "external_url_small": "//images.icecat.biz/img/norm/medium/13374503-9343.jpg",
              "external_url_large": "//images.icecat.biz/img/norm/high/13374503-9343.jpg"
            }
          ]
        },
        {
          "abstract_sku": "017",
          "abstract_name": "Sony Cyber-shot DSC-W800",
          "price": 345699,
          "images": [
            {
              "external_url_small": "//images.icecat.biz/img/norm/medium/21748906-Sony.jpg",
              "external_url_large": "//images.icecat.biz/img/norm/high/21748906-Sony.jpg"
            }
          ]
        },
        {
          "abstract_sku": "016",
          "abstract_name": "Sony Cyber-shot DSC-W800",
          "price": 9999,
          "images": [
            {
              "external_url_small": "//images.icecat.biz/img/norm/medium/21748907-Sony.jpg",
              "external_url_large": "//images.icecat.biz/img/norm/high/21748907-Sony.jpg"
            }
          ]
        },
      ]
    });
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
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent: this.renderInputComponent,
      suggestions: this.state.suggestions,
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

export default DecoratedCatalog;

// export const CatalogSearchComponent = reduxify(
//   (state: any, ownProps: any) => {
//     const pagesLoginProps: ILoginState = state.pagesLogin ? state.pagesLogin : null;
//     return (
//       {
//         customer: pagesLoginProps && pagesLoginProps.data.customer ? pagesLoginProps.data.customer : ownProps.customer,
//         isAuth: pagesLoginProps && pagesLoginProps.data.isAuth ? pagesLoginProps.data.isAuth : ownProps.isAuth,
//         isLoading: pagesLoginProps && pagesLoginProps.pending ? pagesLoginProps.pending : ownProps.pending,
//       }
//     );
//   }
// )(DecoratedCatalog);
