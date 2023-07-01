"use client";
import * as React from "react";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
export var LanguageContext = createContext({
    selectedLanguage: "",
    handleLanguageChange: function () { },
    languages: [{ code: "", name: "" }],
    defaultLanguage: "",
});
export var useLanguage = function () {
    var context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
export var LanguageProvider = function (_a) {
    var children = _a.children, _b = _a.languages, languages = _b === void 0 ? [
        { code: "ar", name: "Arabic" },
        { code: "en", name: "English" },
        { code: "fr", name: "French" },
        { code: "es", name: "Spanish" },
        { code: "de", name: "German" },
        { code: "it", name: "Italian" },
        { code: "ja", name: "Japanese" },
        { code: "ko", name: "Korean" },
        { code: "zh-CN", name: "Chinese Simplified" },
        { code: "zh-TW", name: "Chinese Traditional" },
    ] : _b, _c = _a.defaultLanguage, defaultLanguage = _c === void 0 ? "en" : _c;
    var userLanguage = typeof navigator !== "undefined" && navigator.language.split("-")[0];
    var _d = useState((typeof window !== "undefined" &&
        window.localStorage.getItem("selectedLanguage")) ||
        userLanguage ||
        ""), selectedLanguage = _d[0], setSelectedLanguage = _d[1];
    var handleLanguageChange = function (language) {
        setSelectedLanguage(language);
        typeof window !== "undefined" &&
            window.localStorage.setItem("selectedLanguage", language);
    };
    useEffect(function () {
        if (typeof window !== "undefined" && selectedLanguage) {
            window.localStorage.setItem("selectedLanguage", selectedLanguage);
        }
    }, [selectedLanguage]);
    useEffect(function () {
        document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
    }, [selectedLanguage]);
    var value = useMemo(function () {
        return {
            selectedLanguage: selectedLanguage,
            handleLanguageChange: handleLanguageChange,
            languages: languages,
            defaultLanguage: defaultLanguage,
        };
    }, [selectedLanguage, handleLanguageChange, defaultLanguage]);
    return (React.createElement(LanguageContext.Provider, { value: value }, children));
};
//# sourceMappingURL=LanguageContext.js.map