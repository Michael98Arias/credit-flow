import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSummaryData } from '@/composables/useSummaryData'
import dayjs from 'dayjs'

let storeMock

vi.mock('../../../stores/useStepperStore', () => {
  return {
    useStepperStore: () => storeMock,
  }
})

vi.mock('vue-i18n', () => {
  return {
    useI18n: () => ({
      t: key => {
        const translations = {
          'summary.notAvailable': 'Not available',
        }
        return translations[key] || key
      },
    }),
  }
})

describe('useSummaryData', () => {
  beforeEach(() => {
    storeMock = {
      documentDate: { day: 10, month: 5, year: 2023 },
      paymentDate: '2023-06-15',
      isDocumentDateValid: true,
      reset: vi.fn(),
      setCurrentStep: vi.fn(),
    }
  })

  it('returns formatted issueDateText correctly', () => {
    const { issueDateText } = useSummaryData()
    expect(issueDateText.value).toBe(dayjs('2023-5-10', 'YYYY-M-D').format('DD-MMM-YYYY'))
  })

  it('returns "Not available" if document date is incomplete', () => {
    storeMock.documentDate = { day: null, month: null, year: null }
    const { issueDateText } = useSummaryData()
    expect(issueDateText.value).toBe('Not available')
  })

  it('returns formatted paymentDateText correctly', () => {
    const { paymentDateText } = useSummaryData()
    expect(paymentDateText.value).toBe(dayjs('2023-06-15', 'YYYY-MM-DD').format('DD-MMM-YYYY'))
  })

  it('returns "Not available" if paymentDate is null', () => {
    storeMock.paymentDate = null
    const { paymentDateText } = useSummaryData()
    expect(paymentDateText.value).toBe('Not available')
  })

  it('returns correct paymentDayText', () => {
    const { paymentDayText } = useSummaryData()
    expect(paymentDayText.value).toBe(15)
  })

  it('returns "Not available" for paymentDayText if paymentDate is invalid', () => {
    storeMock.paymentDate = 'invalid-date'
    const { paymentDayText } = useSummaryData()
    expect(paymentDayText.value).toBe('Not available')
  })

  it('calculates isValid correctly', () => {
    const { isValid } = useSummaryData()
    expect(isValid.value).toBe(true)

    storeMock.isDocumentDateValid = false
    const { isValid: isValid2 } = useSummaryData()
    expect(isValid2.value).toBe(false)

    storeMock.isDocumentDateValid = true
    storeMock.paymentDate = null
    const { isValid: isValid3 } = useSummaryData()
    expect(isValid3.value).toBe(false)
  })

  it('handleFinish calls reset and setCurrentStep(1)', () => {
    const { handleFinish } = useSummaryData()
    handleFinish()
    expect(storeMock.reset).toHaveBeenCalled()
    expect(storeMock.setCurrentStep).toHaveBeenCalledWith(1)
  })
})
