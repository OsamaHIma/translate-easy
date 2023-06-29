# 🌍 Translate-easy

Translate-easy هو حزمة NPM سهلة الاستخدام تتيح لك دمج واجهة برمجة تطبيقات ترجمة جوجل في تطبيقات الويب الخاصة بك.

## الاستخدام

يوفر Translate-easy ثلاثة مكونات رئيسية: LanguageProvider، LanguageSelector، وTranslate.

### LanguageProvider 🌐

مكون LanguageProvider هو مزود سياق يتيح لك إدارة اللغة التي يختارها المستخدم. يجب عليك لف تطبيقك (أو جزءًا من تطبيقك) بـ LanguageProvider لجعل سياق اللغة متاحًا لجميع مكونات الأطفال.

``` jsx
import { LanguageProvider } from 'translate-easy';

function App() {
  return (
    <LanguageProvider>
      {/* محتوى تطبيقك */}
    </LanguageProvider>
  );
}
```

يمكنك تمرير لغاتك إلى LanguageProvider واستبدال اللغات الافتراضية. يمكنك تمرير خاصية defaultLanguage إذا لم يكن اللغة الافتراضية (اللغة التي استخدمتها أثناء تطوير الموقع) هي اللغة الإنجليزية.

```jsx
import { LanguageProvider } from 'translate-easy';

function App() {
  return (
    <LanguageProvider
        languages={[
        { code: "ar", name: "العربية" },
        { code: "en", name: "الإنجليزية" },
        ]}
    >
      {/* محتوى تطبيقك */}
    </LanguageProvider>
  );
}
```

#### اللغات الافتراضية

``` jsx
languages = [
    { code: "ar", name: "العربية" },
    { code: "en", name: "الإنجليزية" },
    { code: "fr", name: "الفرنسية" },
    { code: "es", name: "الإسبانية" },
    { code: "de", name: "الألمانية" },
    { code: "it", name: "الإيطالية" },
    { code: "ja", name: "اليابانية" },
    { code: "ko", name: "الكورية" },
    { code: "zh-CN", name: "الصينية المبسطة" },
    { code: "zh-TW", name: "الصينية التقليدية" },
  ]
```

## LanguageSelector 🌎

مكون LanguageSelector هو قائمة منسدلة تتيح للمستخدم تحديد لغته المفضلة. يقوم بتحديث سياق اللغة تلقائيًا عندما يختار المستخدم لغة.

``` jsx
import { LanguageSelector } from 'translate-easy';

function MyComponent() {
  return (
    <LanguageSelector />
  );
}
```

يمكنك تخصيص مظهر LanguageSelector باستخدام مختلف الخصائص ، مثل buttonBgColor و dropdownTextColor ، إلخ. انظر إلى شفرة المكون للحصول على قائمة كاملة بالخصائص.
أو يمكنك تركه كما هو بالأنماط الافتراضية إذا كنت تستخدم taillwindcss أو استيراد styles.css من مجلد dist.

## Translate 📝

مكونTranslate هو مكون بسيط يترجم السلسلة المعطاة إلى اللغة المختارة من قبل المستخدم. يستخدم واجهة برمجة الترجمة من جوجل لتنفيذ الترجمة.
ستتم حفظ الترجمات في الذاكرة المخبأة ، لذا سيعمل الترجمة دون اتصال بالإنترنت ولن يتم استدعاء واجهة برمجة التطبيقات مرة أخرى.

``` jsx
import { Translate } from 'translate-easy';

function MyComponent() {
  return (
    <h1><Translate>مرحبا</Translate></h1>
  );
}
```

لكن الترجمة من جوجل غير دقيقة؟،

## لهذا السبب يقبل مكون Translate خاصية الترجمات للإطاحة بالترجمة من واجهة برمجة التطبيقات إذا لزم الأمر.

```jsx
import { Translate } from 'translate-easy';

function MyComponent() {
  return (
    <h1><Translate translations={{ en: 'Hello', es: 'Hola' }}>مرحبا</Translate></h1>
  );
}
```