import React from "react";
interface LanguageContextValue {
    selectedLanguage: string;
    handleLanguageChange: (language: string) => void;
    languages: {
        code: string;
        name: string;
    }[];
    defaultLanguage?: string;
}
interface LanguageProviderProps {
    children: React.ReactNode;
    languages?: {
        code: string;
        name: string;
    }[];
    defaultLanguage?: string;
}
export declare const LanguageContext: React.Context<LanguageContextValue>;
export declare const useLanguage: () => LanguageContextValue;
export declare const LanguageProvider: ({ children, languages, defaultLanguage, }: LanguageProviderProps) => React.JSX.Element;
export {};
