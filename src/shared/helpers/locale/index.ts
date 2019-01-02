import * as de from 'react-intl/locale-data/de';
import * as en from 'react-intl/locale-data/en';
import { LocaleData } from 'react-intl';
import { APP_LOCALE_DE, APP_LOCALE_EN } from '../../constants/Environment';
import {TAppLocale} from "src/shared/interfaces/locale/index";

export const getLocaleData = (locale: TAppLocale): LocaleData => {
  if (locale === APP_LOCALE_DE) {
    return de;
  } else {
    if (locale === APP_LOCALE_EN) {
      return en;
    } else {
      return de;
    }
  }
};
