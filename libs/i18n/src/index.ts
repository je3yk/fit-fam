import en from './locales/en.json';
import pl from './locales/pl.json';

export type Locale = 'en' | 'pl';

export const locales: Locale[] = ['en', 'pl'];
export const defaultLocale: Locale = 'en';

export const translations = { en, pl } as const;
export type Translations = typeof en;

export { en, pl };
