import ChannelsManager from './../channels/index.mjs';

const thrshold = 5;

export default class RunnersManager {
    static #runners = [];
    static #runners_x_id = new Map();

    static spawn_runners(count) {
        while (count > 0) {
            this.#spawn(count--);
        }

        ChannelsManager.runner.on_task_complete((payload) => {
            this.#mark_as_free(payload.runner_id);
        });

        ChannelsManager.stats.runners_spawned(
            Array.from(this.#runners_x_id.keys()),
        );
    }

    static get_free_runner_id() {
        let min = Number.POSITIVE_INFINITY;
        let target_id = -1;

        this.#runners.forEach(({ id, q }) => {
            if (q < thrshold) {
                if (q < min) {
                    min = q;
                    target_id = id;
                }
            }
        });

        return target_id;
    }

    static assign_task(runner_id, task) {
        if (runner_id === -1) {
            return;
        }

        const entry = this.#runners_x_id.get(runner_id);

        entry.q = entry.q + 1;

        ChannelsManager.balancer.execute_task({
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

        this.#runners.push(entry);
        this.#runners_x_id.set(id, entry);
    }

    static #mark_as_free(runner_id) {
        const entry = this.#runners_x_id.get(runner_id);

        entry.q = Math.max(0, entry.q - 1);
    }
}
