import { defineStore } from 'pinia';
import dayjs from 'dayjs';

export const useStepperStore = defineStore('stepper', {
  state: () => ({
    _documentDate: { day: null, month: null, year: null },
    paymentDate: null,
    currentStep: 1,
    completedSteps: [],
  }),

  getters: {
    documentDate (state) {
      return { ...state._documentDate };
    },

    isStepCompleted: state => step => state.completedSteps.includes(step),

    isDocumentDateValid (state) {
      const { day, month, year } = state._documentDate;
      if (!day || !month || !year) return false;
      const dateStr = `${year}-${month}-${day}`;
      const date = dayjs(dateStr, 'YYYY-M-D', true);
      if (!date.isValid() || date.isAfter(dayjs()) || date.isBefore('1950-01-01'))
        return false;
      return dayjs().diff(date, 'year') >= 18;
    },
  },

  actions: {
    setDocumentDateField (field, value) {
      if (['day', 'month', 'year'].includes(field)) {
        this._documentDate[field] = value;
      } else {
        throw new Error(`Campo no permitido en documentDate: ${field}`);
      }
    },

    setDocumentDate (date) {
      const { day, month, year } = date;
      this._documentDate = { day, month, year };
    },

    setPaymentDate (date) {
      this.paymentDate = date;
    },

    markStepCompleted (step) {
      if (!this.completedSteps.includes(step)) this.completedSteps.push(step);
    },

    setCurrentStep (step) {
      this.currentStep = step;
    },

    nextStep () {
      if (this.currentStep < 3) this.currentStep++;
    },

    prevStep () {
      if (this.currentStep > 1) this.currentStep--;
    },

    goToStep (step) {
      if (
        step < this.currentStep ||
        this.completedSteps.includes(step) ||
        step === this.currentStep + 1
      ) {
        this.currentStep = step;
      }
    },

    reset () {
      this._documentDate = { day: null, month: null, year: null };
      this.paymentDate = null;
      this.currentStep = 1;
      this.completedSteps = [];
    },
  },
});
