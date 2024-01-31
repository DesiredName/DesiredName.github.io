<template>
    <nav class="navbar">
        <h1 class="navbar_title">DesiredIT Blog</h1>
        <ul class="navbar_crumbs">
            <li class="navbar_crumbs_item">Sections: </li>
            <li class="navbar_crumbs_item">
                <RouterLink class="link" active-class="is-active" to='/'>Main</RouterLink>
            </li>
            <li class="navbar_crumbs_item">
                <RouterLink class="link" active-class="is-active" to='/algorithms'>Algorithms</RouterLink>
            </li>
        </ul>
    </nav>

    <article class="content">
        <RouterView />
    </article>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
    router.push('/')
});
</script>
