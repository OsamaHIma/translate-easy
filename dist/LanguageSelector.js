"use client";
import { __assign } from "tslib";
import * as React from 'react';
import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { FixedSizeList } from "react-window";
import { Translate } from "./Translate";
export var LanguageSelector = function (_a) {
    var _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.style, style = _c === void 0 ? {} : _c, _d = _a.buttonBgColor, buttonBgColor = _d === void 0 ? "bg-green-500/30 backdrop-blur-xl" : _d, _e = _a.buttonTextColor, buttonTextColor = _e === void 0 ? "" : _e, _f = _a.buttonFontSize, buttonFontSize = _f === void 0 ? "" : _f, _g = _a.buttonPadding, buttonPadding = _g === void 0 ? "p-2 px-3" : _g, _h = _a.dropdownBgColor, dropdownBgColor = _h === void 0 ? "bg-blue-100 dark:bg-slate-800" : _h, _j = _a.dropdownTextColor, dropdownTextColor = _j === void 0 ? "" : _j, _k = _a.dropdownFontSize, dropdownFontSize = _k === void 0 ? "" : _k, _l = _a.dropdownPadding, dropdownPadding = _l === void 0 ? "py-2" : _l, _m = _a.dropDownIconClass, dropDownIconClass = _m === void 0 ? "w-5" : _m, dropDownIcon = _a.dropDownIcon;
    var _o = useState(false), isOpen = _o[0], setIsOpen = _o[1];
    var _p = useLanguage(), selectedLanguage = _p.selectedLanguage, handleLanguageChange = _p.handleLanguageChange, languages = _p.languages;
    var name;
    var matchedLanguage = languages.find(function (l) { return l.code === selectedLanguage; });
    if (matchedLanguage) {
        name = matchedLanguage.name;
    }
    else {
        name = "English";
    }
    var DropdownItem = function (_a) {
        var index = _a.index, style = _a.style;
        var language = languages[index];
        return (React.createElement("button", { type: "button", className: "block w-full px-4 py-2 text-left  transition-all hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-green-500 ".concat(selectedLanguage === language.code
                ? "border border-dashed border-gray-400 dark:border-gray-300 rounded-md"
                : "", " ").concat(dropdownTextColor, " ").concat(dropdownFontSize), onClick: function () {
                handleLanguageChange(language.code);
            }, style: style }, language.name));
    };
    return (React.createElement("div", { className: "relative inline-block ltr:ml-4 rtl:mr-4 ".concat(className), style: style },
        React.createElement("button", { className: "".concat(buttonBgColor, " rounded-full ").concat(buttonPadding, " flex items-center gap-3 ").concat(buttonTextColor, " ").concat(buttonFontSize), onClick: function () { return setIsOpen(!isOpen); }, type: "button" },
            React.createElement("span", { className: "ltr:mr-2 rtl:ml-2" },
                React.createElement(Translate, { translations: { ar: "العربية" } }, name)),
            !dropDownIcon && (React.createElement("div", { className: "".concat(dropDownIconClass) },
                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
                    React.createElement("path", { d: "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" })))),
            dropDownIcon),
        isOpen && (React.createElement("div", { className: "absolute right-0 z-10 mt-2 overflow-hidden w-48 ".concat(dropdownBgColor, " rounded-md shadow-xl ").concat(dropdownPadding) },
            React.createElement(FixedSizeList, { height: 200, itemCount: languages.length, itemSize: 40, width: 200 }, function (props) { return React.createElement(DropdownItem, __assign({}, props)); })))));
};
//# sourceMappingURL=LanguageSelector.js.map