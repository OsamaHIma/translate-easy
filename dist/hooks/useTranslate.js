import { __awaiter, __generator } from "tslib";
import { useLanguage } from "../LanguageContext";
/**
 * Hook for translating text based on the selected language.
 * @returns {(text: string, translations?: { [key: string]: string }) => string} The translation function.
 */
/**
 * Example of usage:
 *
 * ```
 * import useTranslate from "./useTranslate";
 *
 * const MyComponent = () => {
 *   const translate = useTranslate();
 *
 *   return <p>{translate("Enter your name", { ar: "ادخل اسمك" })}</p>;
 * };
 *
 * export default MyComponent;
 * ```
 *
 * @returns {string} The translated text.
 */
export var useTranslate = function () {
    var _a = useLanguage(), selectedLanguage = _a.selectedLanguage, developmentLanguage = _a.developmentLanguage, jsonFiles = _a.jsonFiles, useGoogleTranslate = _a.useGoogleTranslate;
    return function (text, translations) {
        if (translations === void 0) { translations = {}; }
        if (selectedLanguage.code === (developmentLanguage === null || developmentLanguage === void 0 ? void 0 : developmentLanguage.code)) {
            return text;
        }
        if (translations[selectedLanguage.code]) {
            return translations[selectedLanguage.code];
        }
        var storageKey = "".concat(selectedLanguage.code, "-").concat(text);
        var storedText = localStorage.getItem(storageKey);
        if (storedText) {
            return storedText;
        }
        var translateText = function () { return __awaiter(void 0, void 0, void 0, function () {
            var jsonPath, response, json, response, json, translatedText, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!jsonFiles) return [3 /*break*/, 3];
                        jsonPath = jsonFiles[selectedLanguage.code];
                        if (!jsonPath) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch(jsonPath)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        if (json[text]) {
                            localStorage.setItem(storageKey, json[text]);
                            return [2 /*return*/, json[text]];
                        }
                        _a.label = 3;
                    case 3:
                        if (!(useGoogleTranslate === true)) return [3 /*break*/, 6];
                        return [4 /*yield*/, fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=".concat(selectedLanguage.code, "&dt=t&q=").concat(text))];
                    case 4:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 5:
                        json = _a.sent();
                        translatedText = json[0][0][0];
                        localStorage.setItem(storageKey, translatedText);
                        return [2 /*return*/, translatedText];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.error("Translation error:", error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, text];
                }
            });
        }); };
        translateText();
        return text;
    };
};
//# sourceMappingURL=useTranslate.js.map