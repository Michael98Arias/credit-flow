<template>
  <v-container class="summary-container">
    <v-card class="pa-4 summary-card">
      <v-card-title class="text-h6">{{ t("summary.title") }}</v-card-title>

      <v-card-text>
        <p><strong>{{ t("summary.issueDate") }}:</strong><br>{{ issueDateText }}</p>
        <br>
        <p><strong>{{ t("summary.paymentDate") }}:</strong><br>{{ paymentDateText }}</p>
        <br>
        <p><strong>{{ t("summary.paymentDayEachMonth") }}:</strong><br>{{ paymentDayText }}</p>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn block color="primary" :disabled="!isValid" @click="handleFinish">
          {{ t("summary.confirm") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { useSummaryData } from '@/composables/useSummaryData';
  import '@/styles/summaryStyles.scss';

  const { t } = useI18n();
  const { issueDateText, paymentDateText, paymentDayText, isValid, handleFinish } = useSummaryData();
</script>
