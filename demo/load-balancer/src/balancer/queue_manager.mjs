import ChannelsManager from './../channels.mjs';

export default class QueueManager {
    static #queue = [];

    static get length() {
        return this.#queue.length;
    }

    static add_task(task) {
        this.#queue = [task].concat(this.#queue);

        ChannelsManager.debug.post_message('QM: task received', task);
    }

    static get_task() {
        return this.#queue.pop();
    }
}
