import { styles } from '@components/pages/CustomerPage/styles';
import { WithRouter } from '@interfaces/common/react';
import { WithStyles } from '@material-ui/core/styles/withStyles';

export interface CustomerPageProps extends WithStyles<typeof styles>, WithRouter {}
