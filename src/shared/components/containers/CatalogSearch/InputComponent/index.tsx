import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { pathSearchPage } from '@routes/contentRoutes';
import { connect } from './connect';
import { IInputComponentProps as Props, IInputComponentState as State } from './types';
import { ICompletionMatch } from '../types';

@connect
export class InputComponent extends React.Component<Props, State> {
    public state: State = {
        parts: [],
        matches: []
    };

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.completion !== this.props.completion) {
            this.suggestQuery();
        }
    }

    private handleFullSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const {
            isLoading,
            sendSearchAction,
            push,
            clearSuggestion,
            currency,
            inputProps: {value}
        } = this.props;

        if (!isLoading && value.length > 2) {
            sendSearchAction({q: value, currency});

            push(pathSearchPage);
            clearSuggestion(value);
        }
    };

    public suggestQuery = () => {
        const {completion, inputProps: {value}} = this.props;
        let suggestQuery = value;

        if (completion.length) {
            completion.some((data: string) => {
                if (data.startsWith(suggestQuery.toLowerCase())) {
                    suggestQuery = data;

                    return true;
                }

                return false;
            });
        }
        const matches = match(suggestQuery, value);
        const parts = parse(suggestQuery, matches);

        this.setState({matches, parts});
    }

    public render() {
        const {classes, ref, ...other} = this.props.inputProps;
        const {parts, matches} = this.state;

        return (
            <form action="/" method="GET" onSubmit={this.handleFullSearch} className="suggestForm">
                <div className={classes.completionInput}>
                    {parts.length && matches.length
                        ? parts.map((part: ICompletionMatch, index: number) => (part.highlight ? (
                            <span key={String(index)} className={classes.hiddenPart}>
                                    {part.text}
                                </span>
                        ) : (
                            <strong key={String(index)} className={classes.visiblePart}>
                                {part.text}
                            </strong>
                        )))
                        : null}
                </div>
                <TextField
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        inputRef: node => ref(node),
                        classes: {
                            root: classes.inputRoot,
                            formControl: classes.formControl,
                            notchedOutline: classes.inputOutline,
                            input: classes.input
                        },
                        startAdornment: (
                            <InputAdornment position="start" classes={{root: classes.inputIconContainer}}>
                                <IconButton aria-label="Search" type="submit">
                                    <SearchIcon classes={{root: classes.inputIcon}} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    {...other}
                />
            </form>
        );
    }
}
