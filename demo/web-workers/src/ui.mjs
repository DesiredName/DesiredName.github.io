export default function UIHelper() {
    return {
        check_worker() {
            if (window.Worker == null) {
                const btn = document.getElementById('worker_thread');

                btn.setAttribute('disabled', true);
                btn.setAttribute(
                    'title',
                    'Worker API is not supported by this browser.',
                );
            }
        },

        disable_buttons() {
            Array.from(document.getElementsByName('runner_button')).forEach(
                (b) => {
                    b.setAttribute('disabled', true);
                },
            );
        },

        enable_buttons() {
            Array.from(document.getElementsByName('runner_button')).forEach(
                (b) => {
                    b.removeAttribute('disabled');
                },
            );
            this.check_worker();
        },
    };
}
