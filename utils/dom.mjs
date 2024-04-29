export default (selector) => {
    const els = Array.from(document.querySelectorAll(selector));

    return {
        disable(state) {
            if (state === true) {
                els.forEach((el) => el.setAttribute('disabled', true));
            } else if (state === false) {
                this.enable(true);
            }

            return this;
        },

        enable(state) {
            if (state === true) {
                els.forEach((el) => el.removeAttribute('disabled'));
            } else if (state === false) {
                this.disable(true);
            }

            return this;
        },

        children(selector) {
            return els.reduce((acc, el) => {
                acc.push(...el.querySelectorAll(selector));
                return acc;
            }, []);
        },

        add_children(children) {
            for (const child of children) {
                els.forEach((el) => {
                    el.appendChild(child);
                });
            }
        },

        on_click(callback) {
            els.forEach((el) =>
                el.addEventListener('click', callback.bind(el)),
            );

            return this;
        },
    };
};
