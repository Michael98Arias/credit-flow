import { computed } from 'vue';
import dayjs from 'dayjs';
import { useStepperStore } from '@/stores/useStepperStore';
import { useI18n } from 'vue-i18n';

export function useSummaryData () {
  const store = useStepperStore();
  const { t } = useI18n();

  const issueDateText = computed(() => {
    const { day, month, year } = store.documentDate;
    if (!day || !month || !year) return t('summary.notAvailable');
    const date = dayjs(`${year}-${month}-${day}`, 'YYYY-M-D');
    return date.isValid()
      ? date.format('DD-MMM-YYYY')
      : t('summary.notAvailable');
  });

  const paymentDateText = computed(() => {
    if (!store.paymentDate) return t('summary.notAvailable');
    const date = dayjs(store.paymentDate, 'YYYY-MM-DD');
    return date.isValid()
      ? date.format('DD-MMM-YYYY')
      : t('summary.notAvailable');
  });

  const paymentDayText = computed(() => {
    if (!store.paymentDate) return t('summary.notAvailable');
    const date = dayjs(store.paymentDate, 'YYYY-MM-DD');
    return date.isValid() ? date.date() : t('summary.notAvailable');
  });

  const isValid = computed(() => store.isDocumentDateValid && !!store.paymentDate);

  const handleFinish = () => {
    store.reset();
    store.setCurrentStep(1);
  };

  return {
    issueDateText,
    paymentDateText,
    paymentDayText,
    isValid,
    handleFinish,
  };
}
