import { i18n } from '@tager/admin-services';

import EN from './locales/en';
import RU from './locales/ru';

i18n.addTranslations('en', 'seo', EN);
i18n.addTranslations('ru', 'seo', RU);

export * from './constants/routes';
export * from './constants/paths';
export * from './utils/paths';
