<script setup lang="ts">
import TheMain from './pages/TheMain.vue';
import TheAlgorithms from './pages/TheAlgorithms.vue';

const is_main_page = window.location.pathname === '/';
const is_algorithms_page = window.location.pathname === '/algorithms';
const component = (() => {
    if (is_main_page) {
        return TheMain;
    }
    if (is_algorithms_page) {
        return TheAlgorithms;
    }
    return undefined;
})();
</script>

<template>
    <nav class="navbar">
        <h1 class="navbar_title">DesiredIT Homepage</h1>
        <ul class="navbar_crumbs">
            <li class="navbar_crumbs_item">Sections: </li>
            <li :class="{
                'navbar_crumbs_item': true,
                'is-active': is_main_page
            }">
                <a class="link" href='/'>Main</a>
            </li>
            <li :class="{
                'navbar_crumbs_item': true,
                'is-active': is_algorithms_page
            }">
                <a class="link" href='/algorithms'>Algorithms</a>
            </li>
        </ul>
    </nav>

    <article class="content">
        <KeepAlive>
            <component :is="component" />
        </KeepAlive>
    </article>
</template>
