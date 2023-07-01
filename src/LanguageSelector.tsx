"use client";
import * as React from 'react';
import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { FixedSizeList } from "react-window";
import { Translate } from "./Translate";

interface LanguageSelectorProps {
  languages?: { code: string; name: string }[];
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
  dropDownIconClass?: string;
  dropDownIcon?: string | React.ReactNode | null;
}

export const LanguageSelector = ({
  className = "",
  style = {},
  buttonBgColor = "bg-green-500/30 backdrop-blur-xl",
  buttonTextColor = "",
  buttonFontSize = "",
  buttonPadding = "p-2 px-3",
  dropdownBgColor = "bg-blue-100 dark:bg-slate-800",
  dropdownTextColor = "",
  dropdownFontSize = "",
  dropdownPadding = "py-2",
  dropDownIconClass = "w-5",
  dropDownIcon,
}: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage, handleLanguageChange, languages } = useLanguage();

  let name;
  const matchedLanguage = languages.find((l) => l.code === selectedLanguage);
  if (matchedLanguage) {
    name = matchedLanguage.name;
  } else {
    name = "English";
  }

  const DropdownItem = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const language = languages[index];
    return (
      <button
        type="button"
        className={`block w-full px-4 py-2 text-left  transition-all hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-green-500 ${
          selectedLanguage === language.code
            ? "border border-dashed border-gray-400 dark:border-gray-300 rounded-md"
            : ""
        } ${dropdownTextColor} ${dropdownFontSize}`}
        onClick={() => {
          handleLanguageChange(language.code);
        }}
        style={style}
      >
        {language.name}
      </button>
    );
  };

  return (
    <div
      className={`relative inline-block ltr:ml-4 rtl:mr-4 ${className}`}
      style={style}
    >
      <button
        className={`${buttonBgColor} rounded-full ${buttonPadding} flex items-center gap-3 ${buttonTextColor} ${buttonFontSize}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="ltr:mr-2 rtl:ml-2">
          <Translate translations={{ ar: "العربية" }}>{name}</Translate>
        </span>

        {!dropDownIcon && (
          <div className={`${dropDownIconClass}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>
        )}
        {dropDownIcon}
      </button>
      {isOpen && (
        <div
          className={`absolute right-0 z-10 mt-2 overflow-hidden w-48 ${dropdownBgColor} rounded-md shadow-xl ${dropdownPadding}`}
        >
          <FixedSizeList
            height={200}
            itemCount={languages.length}
            itemSize={40}
            width={200}
          >
            {(props) => <DropdownItem {...props} />}
          </FixedSizeList>
        </div>
      )}
    </div>
  );
};
