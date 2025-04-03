
export type Language = 'en' | 'es';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    es: string;
  };
}
