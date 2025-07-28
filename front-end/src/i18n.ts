import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';

i18next
    .use(initReactI18next)
    .init({
        resources: {
            fr: {
                translation: fr,
            },
        },
        fallbackLng: 'fr',
    });

export default i18next;