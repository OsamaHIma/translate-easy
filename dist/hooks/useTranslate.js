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
        return __awaiter(void 0, void 0, void 0, function () {
            var storageKey, storedText, jsonPath, response, json, response, json, translatedText, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (selectedLanguage.code === (developmentLanguage === null || developmentLanguage === void 0 ? void 0 : developmentLanguage.code)) {
                            return [2 /*return*/, text];
                        }
                        if (translations[selectedLanguage.code]) {
                            return [2 /*return*/, translations[selectedLanguage.code]];
                        }
                        storageKey = "".concat(selectedLanguage.code, "-").concat(text);
                        storedText = localStorage.getItem(storageKey);
                        if (storedText) {
                            return [2 /*return*/, storedText];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        if (!jsonFiles) return [3 /*break*/, 4];
                        jsonPath = jsonFiles[selectedLanguage.code];
                        if (!jsonPath) return [3 /*break*/, 4];
                        return [4 /*yield*/, fetch(jsonPath)];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json()];
                    case 3:
                        json = _a.sent();
                        if (json[text]) {
                            localStorage.setItem(storageKey, json[text]);
                            return [2 /*return*/, json[text]];
                        }
                        _a.label = 4;
                    case 4:
                        if (!(useGoogleTranslate === true)) return [3 /*break*/, 7];
                        return [4 /*yield*/, fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=".concat(selectedLanguage.code, "&dt=t&q=").concat(text))];
                    case 5:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 6:
                        json = _a.sent();
                        translatedText = json[0][0][0];
                        localStorage.setItem(storageKey, translatedText);
                        return [2 /*return*/, translatedText];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        console.error("Translation error:", error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, text];
                }
            });
        });
    };
};
//# sourceMappingURL=useTranslate.js.map