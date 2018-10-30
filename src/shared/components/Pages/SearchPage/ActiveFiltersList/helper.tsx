import * as React from 'react';
import {firstLetterToUpperCase} from "src/shared/helpers/common/transform";
import {AppPrice} from "src/shared/components/Common/AppPrice/index";
import {
  filterTypeRange, rangeMaxType, rangeMinType,
  TFilterItemName
} from "src/shared/components/Pages/SearchPage/types";

export const createRangeFilterItem = ( isPrice: boolean,
                                       isMin: boolean,
                                       rangeName: string,
                                       value: number,
                                       priceClassName: string | null = null) => {
  let rangeNameTitle = firstLetterToUpperCase(rangeName);
  const rangeNameTitlePrefixed = isMin ? `${rangeNameTitle} from: ` : `${rangeNameTitle} to: `;
  return {
    name: rangeName,
    value,
    label: isPrice
      ? <AppPrice
        value={value * 100}
        title={rangeNameTitlePrefixed}
        extraClassName={priceClassName}
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
