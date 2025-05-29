<template>
  <v-stepper v-model="store.currentStep" alt-labels>
    <v-stepper-header>
      <v-stepper-item
        :class="{
          'step-inactive': store.currentStep !== 1 && !store.isStepCompleted(1),
          'step-active': store.currentStep === 1
        }"
        :color="store.isStepCompleted(1) || store.currentStep === 1 ? 'primary' : 'secondary'"
        :complete="store.isStepCompleted(1)"
        step="1"
        :title="$t('steps.documentDate')"
        value="1"
        @click="tryGoToStep(1)"
      />
      <v-divider :class="dividerClass(1)" />

      <v-stepper-item
        :class="{
          'step-inactive': !(store.isStepCompleted(2) || store.currentStep === 2),
          'step-active': store.currentStep === 2
        }"
        :color="store.isStepCompleted(2) || store.currentStep === 2 ? 'primary' : undefined"
        :complete="store.isStepCompleted(2)"
        step="2"
        :title="$t('steps.paymentDate')"
        value="2"
        @click="tryGoToStep(2)"
      />
      <v-divider :class="dividerClass(2)" />

      <v-stepper-item
        :class="{
          'step-inactive': !(store.isStepCompleted(3) || store.currentStep === 3),
          'step-active': store.currentStep === 3
        }"
        :color="store.isStepCompleted(3) || store.currentStep === 3 ? 'primary' : undefined"
        :complete="store.isStepCompleted(3)"
        step="3"
        :title="$t('steps.summary')"
        value="3"
        @click="tryGoToStep(3)"
      />
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content v-if="store.currentStep === 1" step="1">
        <DocumentDatePage @next="onNext" />
      </v-stepper-content>

      <v-stepper-content v-if="store.currentStep === 2" step="2">
        <PaymentDatePage @next="onNext" @prev="onPrev" />
      </v-stepper-content>

      <v-stepper-content v-if="store.currentStep === 3" step="3">
        <SummaryPage @prev="onPrev" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script setup>
  import { useStepperStore } from '@/stores/useStepperStore';
  import DocumentDatePage from '@/pages/steps/DocumentDatePage.vue';
  import PaymentDatePage from '@/pages/steps/PaymentDatePage.vue';
  import SummaryPage from '@/pages/steps/SummaryPage.vue';
  import '@/styles/StepperStyles.scss'
  const store = useStepperStore();

  function onNext () {
    store.markStepCompleted(store.currentStep);
    store.nextStep();
  }

  function onPrev () {
    store.prevStep();
  }

  function tryGoToStep (step) {
    if (step < store.currentStep) {
      store.goToStep(step);
    }else if (
      step === store.currentStep + 1 &&
      store.isStepCompleted(store.currentStep)
    ) {
      store.goToStep(step);
    }
  }

  function dividerClass (stepNumber) {
    return store.isStepCompleted(stepNumber) && store.currentStep === stepNumber + 1
      ? 'divider-active'
      : '';
  }
</script>
