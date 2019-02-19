import { WithStyles } from '@material-ui/core';
import { styles } from '@components/components/SquareImage/styles';

interface ISquareImageProps extends WithStyles<typeof styles> {
    image: string;
    size: number;
    alt: string | undefined;
}
