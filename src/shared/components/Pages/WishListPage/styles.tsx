import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    appPageTitleRoot: {
        margin: 0,
        padding: 0
    },
    appPageTitleRootPageHeader: {
        fontSize: '2rem',
    },
    titleForm: {
        marginBottom: '0.3125rem'
    },
    textFieldForm: {
        marginRight: '1.5rem',
        padding: 0,
        maxWidth: '27.1875rem',
        width: '100%',
        fontSize: '0.875rem'
    },
    form: {
        padding: '2rem 0'
    },
    formItem: {
        display: 'flex',
        alignItems: 'center'
    },
    formSubmit: {
        padding: '11px 24px',
        minWidth: '8rem',
        fontSize: '1rem'
    },
    input: {
        padding: '0.6875rem 0.75rem',
        fontSize: '0.85rem',
        lineHeight: '1'
    },
    noItems: {
        marginTop: '2rem',
        fontSize: '1rem',
        fontWeight: 'bold'
    },
    placeholder: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '0',
        right: '0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        zIndex: 3,
        pointerEvents: 'none',
        fontSize: 16,
        lineHeight: '20px',
        fontWeight: 500,
        color: '#111111',
        opacity: 0.43
    },
    filled: {
        display: 'none'
    }
});
