import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { pathSearchPage } from '@routes/contentRoutes';
import { connect } from './connect';

@connect
export class InputComponent extends React.Component<any> {
    public state: any = {
        parts: [],
        matches: []
    };

    public componentDidUpdate(prevProps) {
        if (prevProps.completion !== this.props.completion) {
            this.suggestQuery();
        }
    }

    private handleFullSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const {value} = this.props;
        if (!this.props.isLoading && value.length > 2) {
            this.props.sendSearchAction({q: value, currency: this.props.currency});

            this.props.push(pathSearchPage);
            this.props.clearSuggestion(value);
        }
    };

    public suggestQuery = () => {
        let suggestQuery: string = this.props.value;

        if (this.props.completion.length) {
            this.props.completion.some((data: string) => {
                if (data.startsWith(suggestQuery.toLowerCase())) {
                    suggestQuery = data;

                    return true;
                }

                return false;
            });
        }
        const matches = match(suggestQuery, this.props.value);
        const parts = parse(suggestQuery, matches);

        this.setState({parts, matches});
    }

    public render() {
        const {classes, ref, ...other} = this.props;
        const {parts, matches} = this.state;

        return (
            <form action="/" method="GET" onSubmit={this.handleFullSearch} className="suggestForm">
                <div className={classes.completionInput}>
                    {parts.length && matches.length
                        ? parts.map((part, index: number) => (part.highlight ? (
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
                            // formControl: classes.formControl,
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
