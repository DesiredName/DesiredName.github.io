import { RouteRecordSingleView } from 'vue-router';
import MainPage from './../pages/Main.vue';
import AlgorithmsPage from './../pages/Algorithms.vue';
import BlogPage from './../pages/blog/Blog.vue';
import BlogPostPage from './../pages/blog/BlogPost.vue';
import SortPage from './../pages/algorithms/sort/Sort.vue';
import BubbleSortPage from './../pages/algorithms/sort/BubbleSort.vue';

const KnownPages: RouteRecordSingleView[] = [
    { path: '/', component: MainPage },
    { path: '/blog', component: BlogPage },
    { path: '/blog/:id', component: BlogPostPage },
    { path: '/algorithms', component: AlgorithmsPage },
    { path: '/algorithms/sort', component: SortPage },
    {
        path: '/algorithms/sort/bubble_sort',
        component: BubbleSortPage,
    },
];

export default KnownPages;
