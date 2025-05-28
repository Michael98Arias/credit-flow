import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const STORAGE_KEY = 'lang'

export function useLanguage () {
  const { locale, t } = useI18n()
  const currentLang = ref(localStorage.getItem(STORAGE_KEY) || locale.value)

  const languages = computed(() => [
    { label: t('lang.es'), value: 'es' },
    { label: t('lang.en'), value: 'en' },
  ])

  watch(currentLang, newLang => {
    locale.value = newLang
    localStorage.setItem(STORAGE_KEY, newLang)
  })

  watch(locale, newLocale => {
    if (newLocale !== currentLang.value) {
      currentLang.value = newLocale
    }
  })

  return {
    currentLang,
    languages,
  }
}
