import { nextTick, ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockLocale = ref('es')

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: mockLocale,
    t: key => {
      const translations = {
        'lang.es': 'Spanish',
        'lang.en': 'English',
      }
      return translations[key] || key
    },
  }),
}))

beforeEach(() => {
  localStorage.clear()
  mockLocale.value = 'es'
})

import { useLanguage } from '../../../composables/useLanguage'

describe('useLanguage', () => {
  it('returns translated labels correctly', () => {
    const { languages } = useLanguage()

    expect(languages.value).toEqual([
      { label: 'Spanish', value: 'es' },
      { label: 'English', value: 'en' },
    ])
  })

  it('updates localStorage and locale when currentLang changes', async () => {
    const { currentLang } = useLanguage()

    currentLang.value = 'en'

    await nextTick()

    expect(localStorage.getItem('lang')).toBe('en')
    expect(mockLocale.value).toBe('en')
  })

  it('updates currentLang if locale changes externally', async () => {
    const { currentLang } = useLanguage()

    mockLocale.value = 'en'

    await nextTick()

    expect(currentLang.value).toBe('en')
  })
})
