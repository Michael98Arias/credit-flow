import { nextTick } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import dayjs from 'dayjs'

const mockSetPaymentDate = vi.fn()
vi.mock('@/stores/useStepperStore', () => {
  return {
    useStepperStore: () => ({
      paymentDate: '',
      setPaymentDate: mockSetPaymentDate,
    }),
  }
})

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: key => {
      if (key === 'paymentDate.confirmationHtml') {
        return 'Confirmed for <day></day>'
      }
      return key
    },
  }),
}))

import { usePaymentDateOptions } from '@/composables/usePaymentDateOptions'

describe('usePaymentDateOptions', () => {
  beforeEach(() => {
    mockSetPaymentDate.mockClear()
  })

  it('generates 3 options for the next month', () => {
    const { options } = usePaymentDateOptions()
    expect(options.value).toHaveLength(3)

    const nextMonth = dayjs().add(1, 'month')
    expect(options.value[0].value).toBe(dayjs(new Date(nextMonth.year(), nextMonth.month(), 4)).format('YYYY-MM-DD'))
    expect(options.value[1].value).toBe(dayjs(new Date(nextMonth.year(), nextMonth.month(), 15)).format('YYYY-MM-DD'))
    expect(options.value[2].value).toBe(dayjs(new Date(nextMonth.year(), nextMonth.month() + 1, 0)).format('YYYY-MM-DD'))
  })

  it('selected starts with store value and updates store when changed', async () => {
    const { selected } = usePaymentDateOptions()
    expect(selected.value).toBe('')

    const newDate = '2025-12-15'
    selected.value = newDate
    await nextTick()
    expect(mockSetPaymentDate).toHaveBeenCalledWith(newDate)
  })

  it('isValid is true only when selected has a value', () => {
    const { selected, isValid } = usePaymentDateOptions()
    expect(isValid.value).toBe(false)

    selected.value = '2025-12-15'
    expect(isValid.value).toBe(true)
  })

  it('confirmationMessage returns text with formatted day when selected has value', () => {
    const { selected, confirmationMessage } = usePaymentDateOptions()

    selected.value = '2025-12-15'
    const day = dayjs(selected.value).date()
    expect(confirmationMessage.value).toBe(`Confirmed for <span>${day}</span>`)

    selected.value = ''
    expect(confirmationMessage.value).toBe('')
  })
})
