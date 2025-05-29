<template>
  <v-btn
    block
    class="ma-2"
    :color="isSelected ? 'primary' : 'grey lighten-2'"
    :variant="isSelected ? 'flat' : 'outlined'"
    @click="$emit('select', option.value)"
  >
    {{ option.label }}
  </v-btn>
</template>

<script setup>
  defineProps({
    option: Object,
    isSelected: Boolean,
  });
  defineEmits(['select']);
</script>
