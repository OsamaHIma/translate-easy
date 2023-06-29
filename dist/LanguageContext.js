"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageProvider = exports.useLanguage = exports.LanguageContext = void 0;
const react_1 = __importStar(require("react"));
exports.LanguageContext = (0, react_1.createContext)({
    selectedLanguage: "",
    handleLanguageChange: () => { },
    languages: [{ code: "", name: "" }],
    defaultLanguage: "",
});
const useLanguage = () => {
    const context = (0, react_1.useContext)(exports.LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
exports.useLanguage = useLanguage;
const LanguageProvider = ({ children, languages = [
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
], defaultLanguage = "en", }) => {
    const userLanguage = typeof navigator !== "undefined" && navigator.language;
    const [selectedLanguage, setSelectedLanguage] = (0, react_1.useState)((typeof window !== "undefined" &&
        window.localStorage.getItem("selectedLanguage")) ||
        userLanguage ||
        "");
    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        typeof window !== "undefined" &&
            window.localStorage.setItem("selectedLanguage", language);
    };
    (0, react_1.useEffect)(() => {
        if (typeof window !== "undefined" && selectedLanguage) {
            window.localStorage.setItem("selectedLanguage", selectedLanguage);
        }
    }, [selectedLanguage]);
    (0, react_1.useEffect)(() => {
        document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
    }, [selectedLanguage]);
    const value = (0, react_1.useMemo)(() => {
        return {
            selectedLanguage,
            handleLanguageChange,
            languages,
            defaultLanguage,
        };
    }, [selectedLanguage, handleLanguageChange, defaultLanguage]);
    return (react_1.default.createElement(exports.LanguageContext.Provider, { value: value }, children));
};
exports.LanguageProvider = LanguageProvider;
