<template>
  <v-container class="centered-container">
    <v-card class="pa-4 centered-card">
      <v-card-title class="pa-4 bold-text">
        {{ t("paymentDate.title") }}
      </v-card-title>

      <v-card-text>
        <p class="mb-4">{{ t("paymentDate.description") }}</p>

        <p class="mb-4 bold-text">
          {{ t("paymentDate.subTitle") }}
        </p>

        <v-row>
          <v-col
            v-for="option in options"
            :key="option.value"
            cols="12"
            sm="4"
          >
            <PaymentDateButton
              :is-selected="selected === option.value"
              :option="option"
              @select="(val) => (selected = val)"
            />
          </v-col>
        </v-row>

        <p v-if="selected" class="mt-4" v-html="confirmationMessage" />

        <v-alert v-if="!isValid" class="mt-2" text type="error">
          {{ t("paymentDate.error") }}
        </v-alert>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          block
          color="primary"
          :disabled="!isValid"
          @click="handleContinue"
        >
          {{ t("paymentDate.continue") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { useStepperStore } from '@/stores/useStepperStore';
  import { usePaymentDateOptions } from '@/composables/usePaymentDateOptions';
  import PaymentDateButton from '@/components/PaymentDate/DateButton.vue';
  import '@/styles/PaymentStyles.scss';

  const { t } = useI18n();
  const store = useStepperStore();
  const { options, selected, isValid, confirmationMessage } =
    usePaymentDateOptions();

  function handleContinue () {
    if (isValid.value) {
      store.setPaymentDate(selected.value);
      store.markStepCompleted(2);
      store.nextStep();
    }
  }
</script>
