/// <reference types="react" />
interface TranslateProps {
    children: string;
    translations?: {
        [key: string]: string;
    };
}
export declare const Translate: ({ children, translations }: TranslateProps) => JSX.Element;
export {};
