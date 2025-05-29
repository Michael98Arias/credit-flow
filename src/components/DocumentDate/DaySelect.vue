<template>
  <v-select
    dense
    :error="!!error"
    :error-messages="error"
    :items="dayOptions"
    :label="label"
    :model-value="modelValue"
    outlined
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
<script setup lang="ts">
  defineProps({
    modelValue: Number,
    dayOptions: Array,
    label: String,
    error: String,
  });

  defineEmits(['update:modelValue']);
</script>
