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
export declare const LanguageContext: React.Context<LanguageContextValue>;
export declare const useLanguage: () => LanguageContextValue;
export declare const LanguageProvider: React.FC<LanguageProviderProps>;
export {};
