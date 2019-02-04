import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ISuperAttribute } from 'src/shared/helpers/product/types';
import { styles } from './styles';

export interface SuperAttributeBlockProps extends WithStyles<typeof styles> {
    attributeData: ISuperAttribute;
    selectedItemValue: string;
    onValueChanged(selectedData: { name: string, value: string }): void;
}
