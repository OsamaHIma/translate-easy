"use client";
import React, { createContext, useContext, useMemo, useState, useEffect, } from "react";
/**
 * Default array of languages.
 * @type {Language[]}
 */
var defaultLanguages = [
    { code: "ar", name: "العربية", isRtl: true },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "hi", name: "हिन्दी" },
    { code: "it", name: "Italiano" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "zh-CN", name: "中文（简体）" },
    { code: "zh-TW", name: "中文（繁體）" },
];
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
export var LanguageContext = createContext({
    selectedLanguage: { code: "", name: "" },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleChangeLanguage: function () { },
    languages: [{ code: "", name: "" }],
    userSelectedLanguage: { code: "", name: "" },
    developmentLanguage: { code: "", name: "" }
});
/**
 * Custom hook to access the language context.
 * @returns {LanguageContextValue} The language context value.
 */
export var useLanguage = function () {
    var context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider component");
    }
    return context;
};
/**
 * The provider component for managing language settings.
 * @param {LanguageProviderProps} props - The component props.
 * @returns {JSX.Element} The JSX element.
 */
export var LanguageProvider = function (_a) {
    var children = _a.children, _b = _a.languages, languages = _b === void 0 ? defaultLanguages : _b, _c = _a.userSelectedLanguage, userSelectedLanguage = _c === void 0 ? { code: "en", name: "English" } : _c, _d = _a.developmentLanguage, developmentLanguage = _d === void 0 ? { code: "en", name: "English" } : _d, // Default to English for development
    jsonFiles = _a.jsonFiles, _e = _a.useGoogleTranslate, useGoogleTranslate = _e === void 0 ? true : _e;
    var _f = useState(function () {
        var storedLanguageCode = typeof window !== "undefined" &&
            window.localStorage.getItem("selectedLanguage");
        if (storedLanguageCode) {
            var storedLanguage = languages.find(function (language) { return language.code === storedLanguageCode; });
            if (storedLanguage) {
                return storedLanguage;
            }
        }
        return userSelectedLanguage || developmentLanguage;
    }), selectedLanguage = _f[0], setSelectedLanguage = _f[1];
    /**
     * Function to change the selected language.
     * @param {string} languageCode - The code of the language to set.
     * @returns {void}
     */
    var handleChangeLanguage = function (languageCode) {
        var selectedLanguage = languages.find(function (language) { return language.code === languageCode; });
        if (selectedLanguage) {
            setSelectedLanguage(selectedLanguage);
        }
    };
    useEffect(function () {
        if (typeof window !== "undefined" && selectedLanguage.code) {
            window.localStorage.setItem("selectedLanguage", selectedLanguage.code);
        }
        if (selectedLanguage.isRtl === true) {
            document.documentElement.dir = "rtl";
        }
        else {
            document.documentElement.dir = "ltr";
        }
    }, [selectedLanguage]);
    var value = useMemo(function () {
        return {
            selectedLanguage: selectedLanguage,
            handleChangeLanguage: handleChangeLanguage,
            languages: languages,
            userSelectedLanguage: userSelectedLanguage,
            developmentLanguage: developmentLanguage,
            jsonFiles: jsonFiles,
            useGoogleTranslate: useGoogleTranslate
        };
    }, [
        selectedLanguage,
        handleChangeLanguage,
        languages,
        userSelectedLanguage,
        developmentLanguage,
        jsonFiles,
        useGoogleTranslate,
    ]);
    return (React.createElement(LanguageContext.Provider, { value: value }, children));
};
//# sourceMappingURL=LanguageContext.js.map