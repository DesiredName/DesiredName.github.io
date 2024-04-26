import STEPS from './registration-steps.mjs';
import step_in_animation from './animations/step-in.mjs';
import step_out_animation from './animations/step-out.mjs';

const view_name = 'the-container';

export default class RegistrationForm {
    static #el_container;
    static #step_id = STEPS.STEP_1;

    static init(el_container) {
        this.#el_container = el_container;
        this.#el_container.style.viewTransitionName = view_name;
    }

    static #page_change(html, step_id) {
        this.#step_id = step_id;
        this.#el_container.innerHTML = html;
    }

    static #animate_page_change_with_api(html, step_id) {
        const transition = document.startViewTransition(() => {
            RegistrationForm.#page_change(html, step_id);
        });

        transition.ready.then(() => {
            document.documentElement.animate(step_in_animation, {
                duration: 500,
                iterations: 1,
                fill: 'forwards',
                pseudoElement: `::view-transition-new(${view_name})`,
            });
            document.documentElement.animate(step_out_animation, {
                duration: 500,
                iterations: 1,
                fill: 'forwards',
                pseudoElement: `::view-transition-old(${view_name})`,
            });
        });
    }
    static #animate_page_change_with_animate(html, step_id) {
        const anim_out = this.#el_container.children[0].animate(
            step_out_animation,
            {
                duration: 300,
                iterations: 1,
                fill: 'forwards',
            },
        );

        anim_out.finished.then(() => {
            RegistrationForm.#page_change(html, step_id);

            this.#el_container.children[0].animate(step_in_animation, {
                duration: 300,
                iterations: 1,
                fill: 'forwards',
            });
        });
    }

    static async handle_open_page(step_id, no_animate = false) {
        const html = await STEPS.get_html(step_id)();

        if (no_animate === true) {
            RegistrationForm.#page_change(html, step_id);
        } else {
            if (document.startViewTransition == null) {
                RegistrationForm.#animate_page_change_with_animate(
                    html,
                    step_id,
                );
            } else {
                RegistrationForm.#animate_page_change_with_api(html, step_id);
            }
        }
    }

    static handle_step_forward(event) {
        event.preventDefault();

        RegistrationForm.#step_id = STEPS.next(RegistrationForm.#step_id);
        RegistrationForm.handle_open_page(RegistrationForm.#step_id);
    }

    static handle_step_back(event) {
        event.preventDefault();

        RegistrationForm.#step_id = STEPS.previous(RegistrationForm.#step_id);
        RegistrationForm.handle_open_page(RegistrationForm.#step_id);
    }
}
