import * as React from 'react';
import {
  firstLetterToUpperCase,
  rangeFilterValueToBack,
  rangeFilterValueToFront
} from 'src/shared/helpers/common/transform';
import { AppPrice } from 'src/shared/components/Common/AppPrice';
import {
  filterTypeRange,
  IFilterItem,
  rangeMaxType,
  rangeMinType,
  RangeType,
  TFilterItemName,
} from 'src/shared/components/Pages/SearchPage/types';

export const createRangeFilterItem = (isPrice: boolean,
                                      isMin: boolean,
                                      rangeName: string,
                                      value: number,
                                      priceClassName: string | null = null): IFilterItem => {
  let rangeNameTitle = firstLetterToUpperCase(rangeName);
  const rangeNameTitlePrefixed = isMin ? `${rangeNameTitle} from: ` : `${rangeNameTitle} to: `;
  return {
    name: rangeName,
    value,
    label: isPrice
      ? <AppPrice
        value={ value * 100 }
        title={ rangeNameTitlePrefixed }
        extraClassName={ priceClassName }
      />
      : `${rangeNameTitlePrefixed} ${value}`,
    type: filterTypeRange,
    rangeSubType: isMin ? rangeMinType : rangeMaxType,
  };
};

export const transformName = (name: TFilterItemName, separator: string) => {
  let filterNameParts = name.split(separator);
  if (filterNameParts.length <= 0) {
    return name;
  }
  filterNameParts[0] = firstLetterToUpperCase(filterNameParts[0]);
  return filterNameParts.join(' ');
};

export const createRangeFilterItemCombined = (isPrice: boolean,
                                              value: RangeType,
                                              rangeName: string,
                                              priceClassName: string | null = null): IFilterItem | null  => {
  let rangeNameTitle = firstLetterToUpperCase(rangeName);

  let label = null;

  if (isPrice) {
    label = (
      <React.Fragment>
        {`${rangeNameTitle}:`}&nbsp;
        <AppPrice
          value={rangeFilterValueToBack(value.min)}
          extraClassName={ priceClassName }
        />
        &nbsp;{"-"}&nbsp;
        <AppPrice
          value={rangeFilterValueToBack(value.max)}
          extraClassName={ priceClassName }
        />
      </React.Fragment>
    );
  } else {
    label = `${rangeName}: ${value.min} - ${value.max}`;
  }

  return {
    name: rangeName,
    value,
    label,
    type: filterTypeRange,
  };
};
