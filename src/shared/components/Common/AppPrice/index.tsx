import * as React from "react";
import {FormattedNumber} from 'react-intl';
import {reduxify} from '../../../lib/redux-helper';
import {getAppCurrency, TAppCurrency} from "../../../reducers/Common/Init";

interface AppPriceProps {
  currency: TAppCurrency;
  value: number | null;
  specificCurrency?: TAppCurrency;
}

export const AppPriceBase: React.SFC<AppPriceProps> = (props) => {
  const { currency, value, specificCurrency } = props;
  const valueFormatted = value ? (value / 100) : 0;

  return (
    value
      ? <FormattedNumber
          value={valueFormatted}
          style="currency"
          currency={specificCurrency ? specificCurrency : currency}
        />
      : null
  );
};

export const AppPrice = reduxify(
  (state: any, ownProps: any) => {
    const currency: TAppCurrency = getAppCurrency(state, ownProps);
    return ({
        currency,
    });
  }
)(AppPriceBase);
