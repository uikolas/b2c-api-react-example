import { WithStyles } from '@material-ui/core';
import { styles } from 'styles.ts';

interface IAppPageSubTitleProps extends WithStyles<typeof styles> {
    title: string;
    extraClass?: string;
}
