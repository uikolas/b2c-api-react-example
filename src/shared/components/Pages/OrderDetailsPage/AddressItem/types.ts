import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IAddressItemOrder } from 'src/shared/interfaces/addresses';

export interface IAddressItemProps extends WithStyles<typeof styles>, IAddressItemOrder {
    blockTitle: string;
}
