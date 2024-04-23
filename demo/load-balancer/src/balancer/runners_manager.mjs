import ChannelsManager from './../channels.mjs';

export default class RunnersManager {
    static #runners = [];
    static #runners_x_id = new Map();

    static spawn_runners(count) {
        while (count > 0) {
            this.#spawn(count--);
        }
    }

    static get_free_runner_id() {
        let min = Number.POSITIVE_INFINITY;
        let target_id = -1;

        this.#runners.forEach(({ id, q, runner }) => {
            if (q < min) {
                min = q;
                target_id = id;
            }
        });

        return target_id;
    }

    static assign_task(runner_id, task) {
        if (runner_id === -1) {
            return;
        }

        const entry = this.#runners_x_id.get(runner_id);

        entry.q++;

        ChannelsManager.execute_runner_task({
            runner_id,
            task,
        });
    }

    static #spawn(index) {
        const id = 'runner-' + index;
        const runner = new Worker('./runner.mjs', {
            type: 'module',
            name: id,
        });
        const entry = {
            id,
            q: 0,
            runner,
        };

        ChannelsManager.on;
        runner.addEventListener('message', (e) => {
            const command = RUNNER_COMMAND_TYPE.TASK_COMPLETE;

            if (e.data.command === command) {
                this.#mark_as_free(e.data.payload.runner_id);
            }
        });

        this.#runners.push(entry);
        this.#runners_x_id.set(id, entry);
    }

    static #mark_as_free(runner_id) {
        const entry = this.#runners_x_id.get(runner_id);

        entry.q--;
    }
}
