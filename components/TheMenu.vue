<script lang="ts" setup></script>

<template>
  <nav class="the-menu">
    <ul class="the-menu_sections">
      <NuxtLink
        key="blog"
        to="/blog"
        class="the-menu_sections-item font normal light"
        exact-active-class="a"
      >Blog</NuxtLink>
      <NuxtLink
        key="about"
        to="/about"
        class="the-menu_sections-item font normal light"
      >About</NuxtLink>
    </ul>
  </nav>
</template>

<style scoped></style>
