import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js"

// Add your different language files below
//----------------- language files paths ------------------------- 
import en from "./en.json"
//---------------------------------------------------------------- 

// Update your language const here
const appSupportedLanguage = { en }

// Update default language  here
const DEFAULT_LANGUAGE = "en"

const fallback = { languageTag: DEFAULT_LANGUAGE, isRTL: false };

const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(appSupportedLanguage)) ||
    fallback;

i18n.fallbacks = true
i18n.translations = appSupportedLanguage
i18n.locale = languageTag || DEFAULT_LANGUAGE

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof en
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]
