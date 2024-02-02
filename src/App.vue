<template>
    <TheTitle />

    <article class="content">
        <RouterView />
    </article>
</template>

<script lang="ts" setup>
import TheTitle from './components/TheTitle.vue';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
    router.push('/')
});
</script>
