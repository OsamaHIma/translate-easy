import React from "react";
interface LanguageSelectorProps {
    languages?: {
        code: string;
        name: string;
    }[];
    className?: string;
    style?: React.CSSProperties;
    buttonBgColor?: string;
    buttonTextColor?: string;
    buttonFontSize?: string;
    buttonPadding?: string;
    dropdownBgColor?: string;
    dropdownTextColor?: string;
    dropdownFontSize?: string;
    dropdownPadding?: string;
    dropDownIcon?: string | React.ReactNode | null;
}
export declare const LanguageSelector: ({ className, style, buttonBgColor, buttonTextColor, buttonFontSize, buttonPadding, dropdownBgColor, dropdownTextColor, dropdownFontSize, dropdownPadding, dropDownIcon, }: LanguageSelectorProps) => React.JSX.Element;
export {};
