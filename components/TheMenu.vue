<script lang="ts" setup></script>

<template>
  <nav class="the-menu">
    <ul class="the-menu_sections">
      <RouterLink
        to="/"
        class="the-menu_sections-item font normal light"
      >Main</RouterLink>
      <RouterLink
        to="/algorithms"
        class="the-menu_sections-item font normal light"
      >Algorithms</RouterLink>
      <span class="the-menu_sections-item_fake-item"></span>
    </ul>
  </nav>
</template>

<style scoped></style>
