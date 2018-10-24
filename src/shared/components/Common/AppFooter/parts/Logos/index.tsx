import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import { PartnerIconVisa } from '../../assets/partnerIconVisa';
import { PartnerIconDhl } from '../../assets/partnerIconDhl';
import { PartnerIconHermes } from '../../assets/partnerIconHermes';
import { PartnerIconMasterCard } from '../../assets/partnerIconMasterCard';
import { PartnerIconPaypal } from '../../assets/partnerIconPaypal';

import { LogosProps as Props } from './types';
import { styles } from './styles';

export const LogosComponent: React.SFC<Props> = ({ classes }) => (
  <ul className={ classes.logosList }>
    <li className={ classes.logosListItem }><PartnerIconVisa /></li>
    <li className={ classes.logosListItem }><PartnerIconDhl /></li>
    <li className={ classes.logosListItem }><PartnerIconHermes /></li>
    <li className={ classes.logosListItem }><PartnerIconMasterCard /></li>
    <li className={ classes.logosListItem }><PartnerIconPaypal /></li>
  </ul>
);

export const Logos = withStyles(styles)(LogosComponent);
