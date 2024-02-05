import { useColorMode } from '#imports';

const name = ref('dark');

export default function UseTheme() {
    const mode = useColorMode();

    name.value = mode.preference === 'system' ? '' : mode.preference;

    function toggle() {
        if (mode.value === 'dark') {
            mode.preference = 'light';
            name.value = 'light';
        } else {
            mode.preference = 'dark';
            name.value = 'dark';
        }
    }

    return {
        toggle,
        name,
    };
}
