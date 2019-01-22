import * as React from 'react';
import {reduxify} from 'src/shared/lib/redux-helper';
import {FormattedDate} from 'react-intl';
import {getAppTimeZone} from '@stores/reducers/common/init';
import {TOrderDate} from 'src/shared/interfaces/order';
import {IReduxOwnProps, IReduxStore} from "@stores/reducers/types";
import {TAppTimeZone} from "src/shared/interfaces/locale/index";

interface AppDateProps {
  value: TOrderDate;
  timeZone: TAppTimeZone;
}

export const AppDateBase: React.SFC<AppDateProps> = props => {
  const {value, timeZone} = props;

  const date = new Date(value);
  const dateUtcUnix = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  );

  return value ? (
    <FormattedDate
      value={dateUtcUnix}
      timeZone={timeZone}
      year="numeric"
      month="2-digit"
      day="2-digit"
    />
  ) : null;
};

export const AppDate = reduxify((state: IReduxStore, ownProps: IReduxOwnProps) => {
  const timeZone: TAppTimeZone = getAppTimeZone(state, ownProps);
  return {
    timeZone,
  };
})(AppDateBase);
