import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { SprykerSelectProps } from 'src/application/components/UI/SprykerSelect';
import { IFoundItemsProps } from 'src/application/pages/SearchPage/FoundItems/types';

export interface ISortPanelProps extends WithStyles<typeof styles> {
    foundItems: React.SFC<IFoundItemsProps>;
    numberMode: React.SFC<SprykerSelectProps>;
    sorterMode: React.SFC<SprykerSelectProps>;
    isProductsExist: boolean;
}
