import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    completionInput: {
        position: 'absolute',
        left: 20,
        top: 13,
        zIndex: 2,
    },
    hiddenPart: {
        display: 'inline-block',
        transform: 'translateY(-200px)',
    },
    visiblePart: {
        fontSize: 16,
        lineHeight: '20px',
        color: '#000000',
        letterSpacing: '0.5px',
        opacity: 0.35,
        fontWeight: 300,
    },
    inputRoot: {
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingLeft: 5,
    },
    inputOutline: {
        border: '1px solid #d9d9d9',
        backgroundColor: theme.palette.common.white,
        zIndex: 1,
    },
    input: {
        fontSize: 16,
        lineHeight: '20px',
        fontWeight: 500,
        color: theme.appColors.black,
        padding: 13,
        zIndex: 3,
        background: 'transparent',
        letterSpacing: '0.5px',
        '&:not(:focus)': {
            backgroundColor: 'white'
        },
    },
    inputIconContainer: {
        position: 'relative',
        zIndex: 2,
        margin: 0,
    },
    inputIcon: {
        fill: `${theme.appColors.grey} !important`,
    },
});
