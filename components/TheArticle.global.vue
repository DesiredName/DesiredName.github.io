<script setup lang="ts">
defineProps<{
    year: number,
    month: number,
    day: number
}>()
</script>

<template>
    <h3 class="the-article_header font biggest">
        <ContentSlot
            :use="$slots.header"
            unwrap="p"
        />
    </h3>
    <p class="the-article_content font normal">
        <ContentSlot
            :use="$slots.content"
            unwrap="p"
        />
    </p>
    <footer class="the-article_footer font normal">
        <time :datetime="new Date(year, month, day).toLocaleDateString()">
            {{ month.toString().padStart(2, '0') }}.{{ year }}
        </time>
    </footer>
</template>