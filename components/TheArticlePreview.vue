<script setup lang="ts">
defineProps<{
    path: string;
    title: string;
    description: string;
    tags: string[];
    date: Date;
}>();
</script>

<template>
    <NuxtLink
        :to="path"
        class="the-article-preview"
    >
        <h3 class="the-article-preview_title font big">{{ title }}</h3>
        <p class="the-article-preview_description font normal">{{ description }}</p>
        <footer class="the-article-preview_footer">
            <div class="the-artivle-preview_footer_hastags">
                <span
                    v-for="tag in tags"
                    :key="tag"
                    class="font small"
                    style="margin-right: 10px;"
                >
                    #{{ tag }}
                </span>
            </div>
            <div class="the-artivle-preview_footer_date">
                <span class="font normal"> {{ date.toLocaleDateString() }}</span>
            </div>
        </footer>
    </NuxtLink>
</template>