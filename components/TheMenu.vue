<script lang="ts" setup></script>

<template>
  <ContentNavigation v-slot="{ navigation }">
    <nav class="the-menu">
      <ul class="the-menu_sections">
        <NuxtLink
          v-for="link of navigation"
          :key="link._path"
          :to="link._path"
          class="the-menu_sections-item font normal light"
        >{{ link.title }}</NuxtLink>
      </ul>
    </nav>
  </ContentNavigation>
</template>

<style scoped></style>
