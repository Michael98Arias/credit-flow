<template>
  <v-card class="pa-4" outlined>
    <v-card-title>{{ t("documentDate.title") }}</v-card-title>

    <v-card-text>
      <span>
        {{ t("documentDate.mandatory") }}
      </span>
      <v-row>
        <v-col cols="4">
          <YearSelect
            v-model="year"
            :error="errors.year"
            :label="t('documentDate.year')"
            :year-options="yearOptions"
          />
        </v-col>

        <v-col cols="4">
          <MonthSelect
            v-model="month"
            :error="errors.month"
            :label="t('documentDate.month')"
            :month-options="monthOptions"
          />
        </v-col>

        <v-col cols="4">
          <DaySelect
            v-model="day"
            :day-options="dayOptions"
            :error="errors.day"
            :label="t('documentDate.day')"
          />
        </v-col>
      </v-row>

      <v-alert
        v-if="errors.general"
        class="mt-2"
        dense
        text
        type="error"
      >
        {{ errors.general }}
      </v-alert>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        :disabled="!isFormComplete"
        @click="handleNext"
      >
        {{ t("documentDate.continue") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { computed, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useStepperStore } from '@/stores/useStepperStore';
  import { useDocumentDateValidation } from '@/composables/useDocumentDateValidation';

  import YearSelect from '@/components/DocumentDate/YearSelect.vue';
  import MonthSelect from '@/components/DocumentDate/MonthSelect.vue';
  import DaySelect from '@/components/DocumentDate/DaySelect.vue';

  const emit = defineEmits(['next']);
  const { t } = useI18n();
  const store = useStepperStore();

  const day = computed({
    get: () => store.documentDate.day,
    set: val => store.setDocumentDateField('day', val),
  });

  const month = computed({
    get: () => store.documentDate.month,
    set: val => store.setDocumentDateField('month', val),
  });

  const year = computed({
    get: () => store.documentDate.year,
    set: val => store.setDocumentDateField('year', val),
  });


  const {
    errors,
    dayOptions,
    monthOptions,
    yearOptions,
    validate,
    updateDayOptions,
    isFormComplete,
  } = useDocumentDateValidation(t, day, month, year);

  watch([month, year], () => {
    updateDayOptions();
  });

  function handleNext () {
    if (validate()) {
      store.markStepCompleted(1);
      emit('next');
    }
  }
</script>
