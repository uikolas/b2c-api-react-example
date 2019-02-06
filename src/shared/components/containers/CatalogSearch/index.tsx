// tslint:disable:max-file-line-count
import * as React from 'react';
import Autosuggest from 'react-autosuggest';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ClickEvent, InputChangeEvent } from 'src/shared/interfaces/common/react';
import { IProductCard } from 'src/shared/interfaces/product/index';
import { styles } from './styles';
import { CatalogProps as Props, CatalogState as State } from './types';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { InputComponent } from './InputComponent';
import { Suggestions } from './Suggestions';
import { SuggestionsContainer } from './SuggestionsContainer';

@connect
export class CatalogSearchBase extends React.Component<Props, State> {
    private containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    public timer: number | null;

    public state: State = {
        value: '',
    };

    private getSuggestionValue = (suggestion: IProductCard): string => suggestion.abstractName;

    private handleSuggestionsFetchRequested = ({value}: {value: string}) => {
        const {value: currentValue} = this.state;

        if (!this.props.isLoading && value !== currentValue) {
            clearTimeout(this.timer);

            this.timer = window.setTimeout(() => {
                if (this.state.value === value) {
                    this.props.sendSuggestionAction(value);
                }
            }, 800);
        }
    };

    private handleSuggestionsClearRequested = (): void => {};

    private clearSuggestion = (value: string): void => {
        this.props.clearSuggestions(value);
        this.setState({value: ''});
    };

    private handleChange = (event: InputChangeEvent, {newValue}: {newValue: string}): void => {
        if (newValue.trim().length < 4) {
            this.props.clearSuggestions(newValue);
        }

        if (!this.props.isLoading) {
            this.setState({
                value: newValue
            });
        }
    };

    private shouldRenderSuggestions = (value: string): boolean => value && value.trim().length > 2;

    private renderInputComponent = (inputProps: any): JSX.Element => {
        console.log(inputProps);

        const propsForComponent = {
            inputProps: {...inputProps},
            value: this.state.value,
            clearSuggestion: this.clearSuggestion,
            currency: this.props.currency,
            isLoading: this.props.isLoading,
            completion: this.props.completion
        }

        return (
            <InputComponent {...propsForComponent} />
        );
    };

    private renderSuggestion = (
        suggestion: IProductCard,
        {query, isHighlighted}: {query: string; isHighlighted: boolean}
    ) => {

        const {classes} = this.props;

        return (
            <Suggestions
                isHighlighted={isHighlighted}
                query={query}
                classes={classes}
                suggestion={suggestion}
                clearSuggestion={this.clearSuggestion}
                containerRef={this.containerRef}
            />
        );
    };

    private renderSuggestionsContainer = (options: Autosuggest.RenderSuggestionsContainerParams): JSX.Element => {
        const {categories, completion, suggestions, categoriesTree, classes} = this.props;

        return (
          <SuggestionsContainer
              categories={categories}
              completion={completion}
              suggestions={suggestions}
              categoriesTree={categoriesTree}
              classes={classes}
              options={options}
              clearSuggestion={this.clearSuggestion}
          />
        );
    };

    /* RENDER */
    public render() {
        const {value} = this.state;
        const {classes, suggestions, /*isLoading*/ id} = this.props;
        const filledClass = value.length > 0 ? classes.filled : '';

        const autosuggestProps = {
            id,
            suggestions,
            renderInputComponent: this.renderInputComponent,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion: this.renderSuggestion,
            renderSuggestionsContainer: this.renderSuggestionsContainer,
            shouldRenderSuggestions: this.shouldRenderSuggestions
        };

        return (
            <div className={classes.root} id="CatalogSearch" ref={this.containerRef}>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                        value,
                        onChange: this.handleChange,
                        type: 'text'
                    }}
                    theme={{
                        container: classes.container,
                        suggestionsContainer: classes.suggestionsContainer,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion
                    }}
                />
                <span className={`${classes.placeholder} ${filledClass}`}>
                    <FormattedMessage id={'header.form.autosuggest.placeholder'} />
                </span>
                {this.props.isLoading ? (
                    <div className={classes.pendingProgress}>
                        <CircularProgress size={34} color="primary" />
                    </div>
                ) : null}
            </div>
        );
    }
}

const CatalogSearchComponent = withStyles(styles)(CatalogSearchBase);

export default CatalogSearchComponent;
