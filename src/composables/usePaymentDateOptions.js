import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { useStepperStore } from '@/stores/useStepperStore';
import { useI18n } from 'vue-i18n';

export function usePaymentDateOptions () {
  const store = useStepperStore();
  const { t } = useI18n();

  const today = dayjs();
  const nextMonth = today.add(1, 'month');

  const options = computed(() => {
    const year = nextMonth.year();
    const month = nextMonth.month();
    return [
      dayjs(new Date(year, month, 4)),
      dayjs(new Date(year, month, 15)),
      dayjs(new Date(year, month + 1, 0)),
    ].map(d => ({
      label: d.format('DD-MMM-YYYY'),
      value: d.format('YYYY-MM-DD'),
    }));
  });

  const selected = ref(store.paymentDate);

  const isValid = computed(() => !!selected.value);

  const confirmationMessage = computed(() => {
    if (!selected.value) return '';
    const day = dayjs(selected.value).date();
    return t('paymentDate.confirmationHtml').replace(
      '<day></day>',
      `<span>${day}</span>`
    );
  });

  watch(selected, newVal => {
    store.setPaymentDate(newVal);
  });

  return {
    options,
    selected,
    isValid,
    confirmationMessage,
  };
}
