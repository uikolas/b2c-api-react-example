import { WithStyles } from '@material-ui/core';
import { styles } from 'styles.ts';

interface IAppPageTitleProps extends WithStyles<typeof styles> {
    title?: string;
    intro?: string | JSX.Element | null;
}
