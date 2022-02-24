import polyglotI18nProvider from 'ra-i18n-polyglot';
import { ru, en } from '../../translations';

const DEFAULT_LOCALE = localStorage.getItem('lang') || 'en';

export const i18nProvider = polyglotI18nProvider(locale => {
  switch (locale) {
    case 'ru':
      return ru;
    case 'en':
      return en;
    default:
      return en;
  }
}, DEFAULT_LOCALE);
