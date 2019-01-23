import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export type link = {
  name: any;
  path: any;
};

export interface LinksProps extends WithStyles<typeof styles> {
  external?: any;
  title: any;
  links: link[];
}
