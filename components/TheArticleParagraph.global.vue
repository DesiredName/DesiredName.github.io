<template>
    <p class="the-article-paragraph font normal">
        <ContentSlot
            :use="$slots.default"
            unwrap="p"
        />
    </p>
</template>