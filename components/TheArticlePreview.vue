<script setup lang="ts">
defineProps<{
    path: string;
    title: string;
    description: string;
    tags: string[];
}>();
</script>

<template>
    <NuxtLink :to="path">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <footer>{{ tags }}</footer>
    </NuxtLink>
</template>