import { beforeEach, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useDocumentDateValidation } from '@/composables/useDocumentDateValidation'
import dayjs from 'dayjs'

describe('useDocumentDateValidation', () => {
  let day, month, year, t, composable

  beforeEach(() => {
    day = ref(null)
    month = ref(null)
    year = ref(null)
    t = key => key
    composable = useDocumentDateValidation(t, day, month, year)
  })

  it('should initialize with empty errors and options', () => {
    expect(composable.errors.value.general).toBe('')
    expect(composable.monthOptions).toHaveLength(12)
    expect(composable.yearOptions.value.length).toBeGreaterThan(0)
    expect(composable.dayOptions.value).toEqual([])
  })

  it('should mark form as incomplete initially', () => {
    expect(composable.isFormComplete.value).toBe(false)
  })

  it('should generate correct days for a given month and year', () => {
    month.value = 2
    year.value = 2020
    composable.updateDayOptions()
    expect(composable.dayOptions.value).toHaveLength(29)
  })

  it('should validate missing fields', () => {
    const result = composable.validate()
    expect(result).toBe(false)
    expect(composable.errors.value.general).toBe('documentDate.errors.complete_all_fields')
  })

  it('should invalidate future date', () => {
    const future = dayjs().add(1, 'day')
    day.value = future.date()
    month.value = future.month() + 1
    year.value = future.year()
    const result = composable.validate()
    expect(result).toBe(false)
    expect(composable.errors.value.general).toBe('documentDate.errors.date_cannot_be_future')
  })

  it('should invalidate if under 18', () => {
    const under18 = dayjs().subtract(17, 'years')
    day.value = under18.date()
    month.value = under18.month() + 1
    year.value = under18.year()
    const result = composable.validate()
    expect(result).toBe(false)
    expect(composable.errors.value.general).toBe('documentDate.errors.must_be_18')
  })

  it('should pass for a valid date older than 18', () => {
    const validDate = dayjs().subtract(20, 'years')
    day.value = validDate.date()
    month.value = validDate.month() + 1
    year.value = validDate.year()
    const result = composable.validate()
    expect(result).toBe(true)
    expect(composable.errors.value.general).toBe('')
  })
})
