import React from "react";
interface Language {
    code: string;
    name: string;
    isRtl?: boolean;
}
interface LanguageContextValue {
    selectedLanguage: Language;
    handleChangeLanguage: (languageCode: string) => void;
    languages?: Language[];
    userSelectedLanguage?: Language;
    developmentLanguage?: Language;
    jsonFiles?: {
        [key: string]: string;
    };
    useGoogleTranslate?: boolean;
}
interface LanguageProviderProps {
    children: React.ReactNode;
    languages?: Language[];
    useGoogleTranslate?: boolean;
    userSelectedLanguage?: Language;
    developmentLanguage?: Language;
    jsonFiles?: {
        [key: string]: string;
    };
}
/**
 * Represents the value of the LanguageContext.
 * @typedef {Object} LanguageContextValue
 * @property {Language} selectedLanguage - The selected language.
 * @property {(languageCode: string) => void} handleChangeLanguage - A function to change the selected language.
 * @property {Language[]} languages - An array of available languages.
 * @property {Language} userSelectedLanguage - The language selected by the user during runtime.
 * @property {Language} developmentLanguage - The language used during development.
 */
/**
 * Represents the properties of the LanguageProvider component.
 * @typedef {Object} LanguageProviderProps
 * @property {ReactNode} children - The children components.
 * @property {Language[]} [languages] - An optional array of available languages.
 * @property {Language} userSelectedLanguage - The language selected by the user during runtime.
 * @property {Language} developmentLanguage - The language used during development.
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
 */
export declare const LanguageProvider: ({ children, languages, userSelectedLanguage, developmentLanguage, jsonFiles, useGoogleTranslate, }: LanguageProviderProps) => JSX.Element;
export {};
