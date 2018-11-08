import * as React from 'react';
import { FormattedNumber } from 'react-intl';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { reduxify } from 'src/shared/lib/redux-helper';
import { getAppCurrency, TAppCurrency } from 'src/shared/reducers/Common/Init';
import {priceTypeNameDefault, priceTypeNameOriginal, TPriceTypeName} from 'src/shared/interfaces/product';
import { styles } from './styles';

interface AppPriceProps extends WithStyles<typeof styles> {
  currency: TAppCurrency;
  value: number | null;
  specificCurrency?: TAppCurrency;
  priceType?: TPriceTypeName;
  title?: string;
  extraClassName?: string;
}

export const AppPriceBase: React.SFC<AppPriceProps> = (props) => {
  const {classes, currency, value, specificCurrency, priceType, title, extraClassName} = props;
  const valueFormatted = value ? (value / 100) : 0;
  let priceClassName = '';
  if (priceType === priceTypeNameOriginal) {
    priceClassName = classes.strikethrough;
  } else {
    priceClassName = classes.defaultPrice;
  }

  return (
    value
      ? <span className={ extraClassName ? `${priceClassName} ${extraClassName}` : priceClassName }>
          {title ? title : null}
          <FormattedNumber
            value={ valueFormatted }
            style="currency"
            currency={ specificCurrency ? specificCurrency : currency }
          />
      </span>
      : null
  );
};

export const AppPriceStyled = withStyles(styles)(AppPriceBase);

export const AppPrice = reduxify(
  (state: any, ownProps: any) => {
    const currency: TAppCurrency = getAppCurrency(state, ownProps);
    return ({
      currency,
    });
  },
)(AppPriceStyled);
