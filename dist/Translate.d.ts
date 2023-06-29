import React from "react";
interface TranslateProps {
    children: string;
    translations?: {
        [key: string]: string;
    };
}
export declare const Translate: ({ children, translations }: TranslateProps) => React.JSX.Element;
export {};
