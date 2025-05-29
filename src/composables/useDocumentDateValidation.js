import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'

export function useDocumentDateValidation (t, day, month, year) {
  const errors = ref({
    day: '',
    month: '',
    year: '',
    general: '',
  })

  const monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const currentYear = dayjs().year()
  const minYear = 1950
  const maxYear = currentYear - 18

  const yearOptions = computed(() =>
    Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i)
  )

  const dayOptions = ref([])

  function updateDayOptions () {
    if (!month.value || !year.value) {
      dayOptions.value = []
      return
    }

    const daysInMonth = dayjs(`${year.value}-${month.value}`, 'YYYY-M').daysInMonth()

    dayOptions.value = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    if (day.value && day.value > daysInMonth) {
      day.value = null
    }
  }

  function validate () {
    errors.value.day = ''
    errors.value.month = ''
    errors.value.year = ''
    errors.value.general = ''

    if (!year.value) errors.value.year = t('documentDate.errors.select_year')
    if (!month.value) errors.value.month = t('documentDate.errors.select_month')
    if (!day.value) errors.value.day = t('documentDate.errors.select_day')

    if (errors.value.day || errors.value.month || errors.value.year) {
      errors.value.general = t('documentDate.errors.complete_all_fields')
      return false
    }

    const dateStr = `${year.value}-${month.value}-${day.value}`
    const date = dayjs(dateStr, 'YYYY-M-D', true)

    if (!date.isValid()) {
      errors.value.general = t('documentDate.errors.invalid_date')
      return false
    }

    if (date.isAfter(dayjs())) {
      errors.value.general = t('documentDate.errors.date_cannot_be_future')
      return false
    }

    const minDate = dayjs('1950-01-01')
    if (date.isBefore(minDate)) {
      errors.value.general = t('documentDate.errors.date_after_minimum')
      return false
    }

    const minAgeDate = dayjs().subtract(18, 'year')
    if (date.isAfter(minAgeDate)) {
      errors.value.general = t('documentDate.errors.must_be_18')
      return false
    }

    return true
  }

  const isFormComplete = computed(() =>
    year.value != null && month.value != null && day.value != null
  )

  watch(
    [month, year],
    ([newMonth, newYear], [oldMonth, oldYear]) => {
      if (newMonth !== oldMonth || newYear !== oldYear) {
        updateDayOptions()
      }
    },
    { immediate: true }
  )

  return {
    errors,
    dayOptions,
    monthOptions,
    yearOptions,
    validate,
    updateDayOptions,
    isFormComplete,
  }
}
