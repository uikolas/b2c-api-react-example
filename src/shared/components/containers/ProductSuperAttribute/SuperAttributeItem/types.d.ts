import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ISuperAttributeData } from 'src/shared/helpers/product/types';
import { styles } from './styles';

export interface SuperAttributeItemProps extends WithStyles<typeof styles> {
    attributeItemData: ISuperAttributeData;
    isSelected: boolean;

    onSelect(attributeValue: string): void;
}
