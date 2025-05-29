<template>
  <v-select
    dense
    :error="!!error"
    :error-messages="error"
    :items="yearOptions"
    :label="label"
    :model-value="modelValue"
    outlined
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup>
  defineProps({
    modelValue: Number,
    yearOptions: Array,
    label: String,
    error: String,
  });

  defineEmits(['update:modelValue']);
</script>
