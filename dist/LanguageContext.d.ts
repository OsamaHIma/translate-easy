import React from "react";
interface Language {
    code: string;
    name: string;
}
interface LanguageContextValue {
    selectedLanguage: Language;
    handleChangeLanguage: (languageCode: string) => void;
    languages: Language[];
    defaultLanguage: Language;
}
interface LanguageProviderProps {
    children: React.ReactNode;
    languages?: Language[];
    defaultLanguage: Language;
}
/**
 * Represents a language with a code and name.
 * @typedef {Object} Language
 * @property {string} code - The language code.
 * @property {string} name - The language name.
 */
/**
 * Represents the value of the LanguageContext.
 * @typedef {Object} LanguageContextValue
 * @property {Language} selectedLanguage - The selected language.
 * @property {(languageCode: string) => void} handleChangeLanguage - A function to change the selected language.
 * @property {Language[]} languages - An array of available languages.
 * @property {Language} defaultLanguage - The default language.
 */
/**
 * Represents the properties of the LanguageProvider component.
 * @typedef {Object} LanguageProviderProps
 * @property {ReactNode} children - The children components.
 * @property {Language[]} [languages] - An optional array of available languages.
 * @property {Language} defaultLanguage - The default language.
 */
/**
 * The context for managing language settings.
 * @type {React.Context<LanguageContextValue>}
 */
export declare const LanguageContext: React.Context<LanguageContextValue>;
/**
 * Custom hook to access the language context.
 * @returns {LanguageContextValue} The language context value.
 */
export declare const useLanguage: () => LanguageContextValue;
/**
 * The provider component for managing language settings.
 * @param {LanguageProviderProps} props - The component props.
 * @returns {JSX.Element} The JSX element.
 * @example
 * // Example 1: Basic usage with default settings
 * <LanguageProvider defaultLanguage={{ code: "en", name: "English" }}>
 *   <App />
 * </LanguageProvider>
 *
 * // Example 2: Providing custom languages and default language
 * const customLanguages = [
 *   { code: "es", name: "Español" },
 *   { code: "fr", name: "Français" },
 *   { code: "de", name: "Deutsch" },
 * ];
 * <LanguageProvider languages={customLanguages} defaultLanguage={{ code: "es", name: "Español" }}>
 *   <App />
 * </LanguageProvider>
 */
export declare const LanguageProvider: React.FC<LanguageProviderProps>;
export {};
