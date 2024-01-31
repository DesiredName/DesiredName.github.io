import { RouteRecordSingleView } from 'vue-router';
import TheMain from './../pages/TheMain.vue';
import TheAlgorithms from './../pages/TheAlgorithms.vue';
import TheSort from './../pages/algorithms/sort/TheSort.vue';
import TheBubbleSort from './../pages/algorithms/sort/TheBubbleSort.vue';

const KnownPages: RouteRecordSingleView[] = [
    { path: '/', component: TheMain },
    { path: '/algorithms', component: TheAlgorithms },
    { path: '/algorithms/sort', component: TheSort },
    {
        path: '/algorithms/sort/bubble_sort',
        component: TheBubbleSort,
    },
];

export default KnownPages;
