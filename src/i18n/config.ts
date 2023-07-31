import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../public/locales/en/translation.json';
import ru from '../../public/locales/ru/translation.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translation: en
    },
    ru: {
      translation: ru
    }
  },
  ns: ['translation'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false
  },
});

i18n.languages = ['en', 'ru'];

export default i18n;