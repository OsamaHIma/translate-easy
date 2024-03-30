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
export declare const useTranslate: () => (text: string, translations?: {
    [key: string]: string;
} | undefined) => string;
