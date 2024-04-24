import ChannelsManager from './../channels/index.mjs';

export default class QueueManager {
    static #queue = [];

    static get length() {
        return this.#queue.length;
    }

    static add_task(task) {
        this.#queue = [task].concat(this.#queue);

        ChannelsManager.stats.balancer_queue_size(this.#queue.length);
        ChannelsManager.debug.post_message('QM: task received', task);
    }

    static get_task() {
        ChannelsManager.stats.balancer_queue_size(this.#queue.length);
        return this.#queue.pop();
    }
}
