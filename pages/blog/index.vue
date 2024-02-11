<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { path: '/blog', sort: [{ order: -1, $numeric: true }] }
</script>

<template>
    <section class="the-page-section">
        <section class="the-page-section_content-box">
            <ContentList
                path="/blog"
                :query="query"
                v-slot="{ list }"
            >
                <TheArticlePreview
                    v-for="post in list"
                    :key="post._path"
                    :title="post.title!"
                    :path="post._path!"
                    :description="post.description"
                    :tags="post.tags"
                    :date="new Date(post.year, post.month, post.day)"
                />
            </ContentList>
        </section>
    </section>
</template>