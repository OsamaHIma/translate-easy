/**
 * Hook for translating text based on the selected language.
 * @param {string} text The text to translate.
 * @param {{ [key: string]: string }[]} translations (Optional)
 *  Custom translations for the current language.
 * @returns {string} The translated text.
 */
export declare const useTranslate: (text: string, translations?: {
    [key: string]: string;
}[]) => string;
