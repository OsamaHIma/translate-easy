import React, { createContext, useContext, useMemo, useState, useEffect, } from "react";
export var LanguageContext = createContext({
    selectedLanguage: { code: "", name: "" },
    handleChangeLanguage: function () { },
    languages: [{ code: "", name: "" }],
    defaultLanguage: { code: "", name: "" }
});
export var useLanguage = function () {
    var context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider component");
    }
    return context;
};
var defaultLanguages = [
    { code: "ar", name: "العربية" },
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
export var LanguageProvider = function (_a) {
    var children = _a.children, _b = _a.languages, languages = _b === void 0 ? defaultLanguages : _b, _c = _a.defaultLanguage, defaultLanguage = _c === void 0 ? { code: "en", name: "English" } : _c;
    var _d = useState(function () {
        var storedLanguageCode = typeof window !== "undefined" &&
            window.localStorage.getItem("selectedLanguage");
        if (storedLanguageCode) {
            var storedLanguage = languages.find(function (language) { return language.code === storedLanguageCode; });
            if (storedLanguage) {
                return storedLanguage;
            }
        }
        // const userLanguage =
        //   typeof navigator !== "undefined" && navigator.language.split("-")[0];
        // const detectedLanguage = languages.find(
        //   (language) => language.code === userLanguage
        // );
        // return detectedLanguage || defaultLanguage;
        return defaultLanguage;
    }), selectedLanguage = _d[0], setSelectedLanguage = _d[1];
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
    }, [selectedLanguage]);
    useEffect(function () {
        document.documentElement.dir =
            selectedLanguage.code === "ar" ? "rtl" : "ltr";
    }, [selectedLanguage]);
    var value = useMemo(function () {
        return {
            selectedLanguage: selectedLanguage,
            handleChangeLanguage: handleChangeLanguage,
            languages: languages,
            defaultLanguage: defaultLanguage
        };
    }, [selectedLanguage, handleChangeLanguage, languages, defaultLanguage]);
    return (React.createElement(LanguageContext.Provider, { value: value }, children));
};
//# sourceMappingURL=LanguageContext.js.map