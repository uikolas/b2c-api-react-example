import * as React from 'react';
import Autosuggest from 'react-autosuggest';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InputChangeEvent } from '@interfaces/common/react';
import { IProductCard } from '@interfaces/product';
import { styles } from './styles';
import {
    ICatalogProps as Props,
    ICatalogState as State,
    IInputProps
} from './types';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { InputComponent } from './InputComponent';
import { Suggestions } from './Suggestions';
import { SuggestionsContainer } from './SuggestionsContainer';
import { ErrorBoundary } from '@components/hoc/ErrorBoundary';

@connect
export class CatalogSearchBase extends React.Component<Props, State> {
    private containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    public timer: number | null;

    public state: State = {
        value: ''
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

    private handleSuggestionsClearRequested = (): void => {
        return;
    };

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

    private renderInputComponent = (inputProps: IInputProps): JSX.Element => {
        const inputComponentProps = {
            inputProps: {...inputProps},
            clearSuggestion: this.clearSuggestion
        };

        return (
            <ErrorBoundary>
                <InputComponent {...inputComponentProps} />
            </ErrorBoundary>
        );
    };

    private renderSuggestion = (
        suggestion: IProductCard,
        {query, isHighlighted}: {query: string; isHighlighted: boolean}
    ) => {

        const suggestionsProps = {
            isHighlighted,
            query,
            suggestion,
            clearSuggestion: this.clearSuggestion,
            containerRef: this.containerRef
        };

        return (
            <ErrorBoundary>
                <Suggestions {...suggestionsProps} />
            </ErrorBoundary>
        );
    };

    private renderSuggestionsContainer = (options: Autosuggest.RenderSuggestionsContainerParams): JSX.Element => {
        const suggestionsContainerProps = {
            options,
            clearSuggestion: this.clearSuggestion
        };

        return (
            <ErrorBoundary>
                <SuggestionsContainer {...suggestionsContainerProps} />
            </ErrorBoundary>
        );
    };

    public render() {
        const {value} = this.state;
        const {classes, suggestions, isLoading, id} = this.props;
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
                {isLoading &&
                    <div className={classes.pendingProgress}>
                        <CircularProgress size={34} color="primary" />
                    </div>
                }
            </div>
        );
    }
}

const CatalogSearchComponent = withStyles(styles)(CatalogSearchBase);

export default CatalogSearchComponent;
