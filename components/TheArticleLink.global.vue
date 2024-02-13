<script setup lang="ts">
defineProps<{
    title: string,
    href: string
}>();
</script>

<template>
    <a
        class="the-article-link font normal"
        :href="href"
    >
        {{ title }}
    </a>
</template>