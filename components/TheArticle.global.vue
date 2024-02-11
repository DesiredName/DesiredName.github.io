<script setup lang="ts">
defineProps<{
    year: number,
    month: number,
    day: number
}>()
</script>

<template>
    <h3 class="font big">
        <ContentSlot
            :use="$slots.header"
            unwrap="p"
        />
    </h3>
    <p>
        <ContentSlot
            :use="$slots.content"
            unwrap="p"
        />
    </p>
    <footer>
        <time :datetime="new Date(year, month, day).toLocaleDateString()">
            {{ month.toString().padStart(2, '0') }}.{{ year }}
        </time>
    </footer>
</template>