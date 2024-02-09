<script setup lang="ts">
defineProps<{
    path: string;
    title: string;
    description: string;
    tags: string[];
}>();
</script>

<template>
    <NuxtLink
        :to="path"
        class="the-article"
    >
        <h3 class="the-article_title font big">{{ title }}</h3>
        <p class="the-article_description font normal">{{ description }}</p>
        <footer class="the-article_hashtags">
            <span
                v-for="tag in tags"
                :key="tag"
                class="font small"
            >
                #{{ tag }}
            </span>
        </footer>
    </NuxtLink>
</template>