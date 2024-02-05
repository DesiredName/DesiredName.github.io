<script lang="ts" setup>
import UseTheme from '~/composables/useTheme';

const useTheme = UseTheme();
</script>

<template>
  <div
    @click="useTheme.toggle"
    class="the-theme-switch"
  >
    <span class="font normal">{{ useTheme.name.value }}</span>
    <div class="the-theme-switch_toggle font normal" />
  </div>
</template>
