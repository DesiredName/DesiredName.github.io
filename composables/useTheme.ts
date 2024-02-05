import { useColorMode } from '#imports';

const name = ref('dark');

export default function UseTheme() {
    const mode = useColorMode();

    name.value =
        mode.preference === 'system'
            ? ''
            : mode.preference === 'dark'
            ? 'to light'
            : 'to dark';

    function toggle() {
        if (mode.value === 'dark') {
            mode.preference = 'light';
            name.value = 'to dark';
        } else {
            mode.preference = 'dark';
            name.value = 'to light';
        }
    }

    return {
        toggle,
        name,
    };
}
