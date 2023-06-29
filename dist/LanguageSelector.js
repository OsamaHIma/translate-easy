"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageSelector = void 0;
const react_1 = __importDefault(require("react"));
const LanguageContext_1 = require("./LanguageContext");
const react_2 = require("react");
const react_window_1 = require("react-window");
const Translate_1 = require("./Translate");
const LanguageSelector = ({ className = "", style = {}, buttonBgColor = "bg-green-500/30 backdrop-blur-xl", buttonTextColor = "", buttonFontSize = "", buttonPadding = "p-2 px-3", dropdownBgColor = "bg-blue-100 dark:bg-slate-800", dropdownTextColor = "", dropdownFontSize = "", dropdownPadding = "py-2", dropDownIcon, }) => {
    const [isOpen, setIsOpen] = (0, react_2.useState)(false);
    const { selectedLanguage, handleLanguageChange, languages } = (0, LanguageContext_1.useLanguage)();
    let name;
    const matchedLanguage = languages.find((l) => l.code === selectedLanguage);
    if (matchedLanguage) {
        name = matchedLanguage.name;
    }
    else {
        name = "English";
    }
    const DropdownItem = ({ index, style, }) => {
        const language = languages[index];
        return (react_1.default.createElement("button", { type: "button", className: `block w-full px-4 py-2 text-left  transition-all hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-green-500 ${selectedLanguage === language.code
                ? "border border-dashed border-gray-400 dark:border-gray-300 rounded-md"
                : ""} ${dropdownTextColor} ${dropdownFontSize}`, onClick: () => {
                handleLanguageChange(language.code);
            }, style: style }, language.name));
    };
    return (react_1.default.createElement("div", { className: `relative inline-block ltr:ml-4 rtl:mr-4 ${className}`, style: style },
        react_1.default.createElement("button", { className: `${buttonBgColor} rounded-full ${buttonPadding} flex items-center gap-3 ${buttonTextColor} ${buttonFontSize}`, onClick: () => setIsOpen(!isOpen), type: "button" },
            react_1.default.createElement("span", { className: "ltr:mr-2 rtl:ml-2" },
                react_1.default.createElement(Translate_1.Translate, { translations: { ar: "العربية" } }, name)),
            !dropDownIcon && (react_1.default.createElement("img", { src: "./chevron-down-solid.svg", alt: "svg icon", className: "w-3" })),
            dropDownIcon),
        isOpen && (react_1.default.createElement("div", { className: `absolute right-0 z-10 mt-2 overflow-hidden w-48 ${dropdownBgColor} rounded-md shadow-xl ${dropdownPadding}` },
            react_1.default.createElement(react_window_1.FixedSizeList, { height: 200, itemCount: languages.length, itemSize: 40, width: 200 }, (props) => react_1.default.createElement(DropdownItem, Object.assign({}, props)))))));
};
exports.LanguageSelector = LanguageSelector;
