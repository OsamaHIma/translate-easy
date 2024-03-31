/// <reference types="react" />
interface TranslateProps {
    children: string;
    translations?: {
        [key: string]: string;
    };
}
/**
 * Props for the Translate component.
 * @typedef {Object} TranslateProps
 * @property {string} children - The text to be translated.
 * @property {{ [key: string]: string }} [translations] - Optional translations for specific languages.
 */
/**
 * Component for translating text based on the selected language.
 * @param {TranslateProps} props - The component props.
 * @returns {JSX.Element} The translated text.
 * @example
 * // Example 1: Basic usage without translations
 * <Translate>Hello, world!</Translate>
 *
 * // Example 2: Usage with specific translations
 * <Translate translations={{ 'ar': 'مرحبا بالعالم', 'fr': 'Bonjour le monde!' }}>Hello, world!</Translate>
 */
export declare const Translate: ({ children, translations }: TranslateProps) => JSX.Element;
export {};
