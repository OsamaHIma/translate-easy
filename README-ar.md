# Translate Easy

Translate Easy هو حزمة React توفر طريقة سهلة لتنفيذ ترجمة اللغة واختيارها في تطبيقات React الخاصة بك. يتيح لك تحديد لغات متعددة وترجمات، ويوفر سياقًا وخطافًا لإدارة اللغة المحددة.

## التثبيت

يمكنك تثبيت الحزمة باستخدام npm أو yarn:

```bash
npm install translate-easy
```

أو

```bash
yarn add translate-easy
```

## الاستخدام

### LanguageProvider

لبدء استخدام Translate Easy، تحتاج إلى لف تطبيقك بعنصر `LanguageProvider` المُقدم من الحزمة. يُعيد هذا العنصر تكوين السياق اللغوي ويدير حالة اللغة المحددة.

```jsx
import { LanguageProvider } from 'translate-easy';

const App = () => {
  return (
    <LanguageProvider>
      {/* مكونات التطبيق الخاصة بك */}
    </LanguageProvider>
  );
};
```

يأخذ عنصر `LanguageProvider` الخصائص الاختيارية التالية:

- `languages`: مصفوفة من كائنات اللغة، تحتوي كل منها على خصائص `code` و `name`. إذا لم يتم توفيرها، سيتم استخدام مجموعة افتراضية من اللغات.
- `defaultLanguage`: اللغة الافتراضية التي يتم استخدامها إذا لم تكن هناك لغة مخزنة أو مستخدم متاحة. يجب أن يكون كائن لغة يحتوي على خصائص `code` و `name`.


```jsx
import { LanguageProvider } from "translate-easy";

function App() {
  return (
    <LanguageProvider
      languages={[
        { code: "ar", name: "Arabic" },
        { code: "en", name: "English" },
      ]}
    >
      {/_ Your app content _/}
    </LanguageProvider>
  );
}
```

اللغات الافتراضية

```jsx
languages = [
  { code: "ar", name: "Arabic" },
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "hi", name: "Hindi" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh-CN", name: "Chinese Simplified" },
  { code: "zh-TW", name: "Chinese Traditional" },
];
```

### useLanguage Hook

للوصول إلى اللغة المحددة وتغيير اللغة، يمكنك استخدام خطاف `useLanguage` المقدم من الحزمة.

```jsx
import { useLanguage } from 'translate-easy';

const MyComponent = () => {
  const { selectedLanguage, handleChangeLanguage, languages } = useLanguage();

  // منطق المكون الخاص بك
};
```

يحتوي كائن `selectedLanguage` على اللغة المحددة حاليًا، و `handleChangeLanguage` هو وظيفة لتغيير اللغة، و `languages` هو مصفوفة من اللغات المتاحة.

### Translate Component

لترجمة السلاسل الخاصة بك بناءً على اللغة المحددة، يمكنك استخدام عنصر `Translate` المقدم من الحزمة.

```jsx
import { Translate } from 'translate-easy';

const MyComponent = () => {
  return (
    <div>
      <Translate translations={{ ar: 'مرحبا', fr: 'Bonjour' }}>
        Hello
      </Translate>
    </div>
  );
};
```

يأخذ عنصر `Translate` الخصائص التالية:

- `translations`: كائن يعيد تعيين رموز اللغة إلى سلاسل مترجمة. يجب أن يتوافق كود اللغة مع الترجمة المقابلة للسلسلة المُترجمة.
- `children`: السلسلة التي ستتم ترجمتها.

### LanguageSelector

لإنشاء محدد لغة أساسي، يمكنك استخدام خطاف `useLanguage` ووظيفة `handleChangeLanguage` المقدمة من الحزمة.

```jsx
import { useLanguage } from 'translate-easy';

function LanguageSelector() {
  const { selectedLanguage, handleChangeLanguage, languages } = useLanguage();

  const handleLanguageClick = (languageCode) => {
    handleChangeLanguage(languageCode);
  };

  return (
    <ul>
      {languages.map((language) => (
        <li
          key={language.code}
          onClick={() => handleLanguageClick(language.code)}
          style={{
            fontWeight:
              selectedLanguage.code === language.code ? "bold" : "normal",
          }}
        >
          {language.name}
        </li>
      ))}
    </ul>
  );
}
```

يمكنك تخصيص مظهر وسلوك محدد اللغة وفقًا لاحتياجات تطبيقك.

## مثال

إليك مثال كامل يوضح كيفية استخدام Translate Easy في تطبيق React:

```jsx
import React from 'react';
import { LanguageProvider, Translate, useLanguage } from 'translate-easy';

const App = () => {
  return (
    <LanguageProvider>
      <MyComponent />
    </LanguageProvider>
  );
};

const MyComponent = () => {
  const { selectedLanguage, handleChangeLanguage, languages } = useLanguage();

  const handleLanguageClick = (languageCode) => {
    handleChangeLanguage(languageCode);
  };

  return (
    <div>
      <LanguageSelector />

      <h1>
        <Translate translations={{ en: 'Hello', fr: 'Bonjour' }}>
          Hello
        </Translate>
      </h1>

      <p>
        <Translate translations={{ en: 'Welcome!', fr: 'Bienvenue !' }}>
          Welcome!
        </Translate>
      </p>

      <ul>
        {languages.map((language) => (
          <li
            key={language.code}
            onClick={() => handleLanguageClick(language.code)}
            style={{
              fontWeight:
                selectedLanguage.code === language.code ? 'bold' : 'normal',
            }}
          >
            {language.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

function LanguageSelector() {
  const { selectedLanguage, handleChangeLanguage, languages } = useLanguage();

  const handleLanguageClick = (languageCode) => {
    handleChangeLanguage(languageCode);
  };

  return (
    <ul>
      {languages.map((language) => (
        <li
          key={language.code}
          onClick={() => handleLanguageClick(language.code)}
          style={{
            fontWeight:
              selectedLanguage.code === language.code ? "bold" : "normal",
          }}
        >
          {language.name}
        </li>
      ))}
    </ul>
  );
}

export default App;
```

في هذا المثال، يلف `LanguageProvider` `MyComponent`، الذي يتضمن `LanguageSelector` ويستخدم عنصر `Translate` لترجمة السلاسل بناءً على اللغة المحددة.

## الاستنتاج

يسهل Translate Easy ترجمة اللغة واختيارها في تطبيقات React. يوفر سياقًا وخطافًا ومكونًا مريحًا لإدارة واستخدام الترجمات. يمكنك دمجه بسهولة في مشروعك وتخصيصه وفقًا لمتطلباتك الخاصة.

لمزيد من المعلومات والأمثلة، يمكنك الرجوع إلى الوثائق الرسمية لـ Translate Easy.

نرحب بالمساهمات! إذا كنت مهتمًا بالمساهمة، يرجى زيارة [مستودع GitHub ↗](https://github.com/OsamaHIma/translate-easy/tree/master). حاليًا، نحتاج إلى شخص لإنشاء حساب OpenAI حتى نتمكن من استخدام ChatGPT للترجمات بشكل أساسي واستخدام Google كبديل.