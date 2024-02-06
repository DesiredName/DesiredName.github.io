<script setup lang="ts">
import type { NavItem } from '@nuxt/content/types';

function collect_articles(navitem: NavItem): NavItem[] {
    let result: NavItem[] = [];

    if (navitem.children == null || navitem.children.length === 0) {
        result.push(navitem);
    } else if (navitem.children) {
        const subresults = navitem.children.map((navitem) => collect_articles(navitem));
        result = result.concat(...subresults);
    }

    return result;
}

const navigation = await fetchContentNavigation()
const articles = navigation.map((navitem) => collect_articles(navitem)).flat(1);
</script>

<template>
    <section class="the-page-main-content">
        <section class="the-page-main-content_section">
            <ul>
                <li
                    v-for="post in articles"
                    :key="post._path"
                >
                    <NuxtLink :to="post._path">
                        {{ post.title }}
                    </NuxtLink>
                </li>
            </ul>
        </section>
    </section>
</template>