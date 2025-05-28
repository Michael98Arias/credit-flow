<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>{{ $t('appTitle') }}</v-toolbar-title>
      <v-spacer />

      <v-menu v-model="menu" :close-on-content-click="false" offset-y transition="scale-transition">
        <template #activator="{ props }">
          <v-btn v-bind="props" aria-label="Cambiar idioma" icon variant="text">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="lang in languages" :key="lang.value" @click="selectLang(lang.value)">
            <v-list-item-title>{{ lang.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue';
  import { useLanguage } from '@/composables/useLanguage';

  const { currentLang, languages } = useLanguage();
  const menu = ref(false);

  function selectLang (lang) {
    currentLang.value = lang;
    menu.value = false;
  }
</script>
