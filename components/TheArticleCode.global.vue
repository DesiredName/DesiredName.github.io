<template>
    <p class="the-article-code font bold">
        <ContentSlot
            :use="$slots.default"
            unwrap="p"
        />
    </p>
</template>