"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translate = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const LanguageContext_1 = require("./LanguageContext");
const Translate = ({ children, translations = {} }) => {
    const { selectedLanguage, defaultLanguage } = (0, LanguageContext_1.useLanguage)();
    const [translatedText, setTranslatedText] = (0, react_2.useState)("");
    (0, react_2.useEffect)(() => {
        const translateText = () => __awaiter(void 0, void 0, void 0, function* () {
            const storageKey = `translatedText_${selectedLanguage}_${children}`;
            const storedText = localStorage.getItem(storageKey);
            if (storedText) {
                setTranslatedText(storedText);
                return;
            }
            if (selectedLanguage === defaultLanguage) {
                setTranslatedText(children);
                return;
            }
            if (translations[selectedLanguage]) {
                setTranslatedText(translations[selectedLanguage]);
                return;
            }
            try {
                const response = yield fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${selectedLanguage}&dt=t&q=${children}`);
                const json = yield response.json();
                const translatedText = json[0][0][0];
                setTranslatedText(translatedText);
                localStorage.setItem(storageKey, translatedText);
            }
            catch (error) {
                console.error(error);
            }
        });
        translateText();
    }, [children, selectedLanguage, defaultLanguage, translations]);
    return react_1.default.createElement(react_1.default.Fragment, null, translatedText.toString() || children);
};
exports.Translate = Translate;
