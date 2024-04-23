import {
    PRODUCER_COMMAND_TYPE,
    DEBUG_INFO_TYPE,
    RUNNER_COMMAND_TYPE,
} from './commands.mjs';

export default class Channels {
    static #debug_channel = new BroadcastChannel('debug-channel');
    static #commands_channel = new BroadcastChannel('commands-channel');

    // debug
    static debug_message(command, payload) {
        Channels.#debug_channel.postMessage({
            command,
            payload,
        });
    }

    static on_debug_message(callback) {
        Channels.#debug_channel.addEventListener('message', callback);
    }

    // producer

    static producer_start() {
        Channels.#commands_channel.postMessage({
            command: PRODUCER_COMMAND_TYPE.START,
        });
    }

    static on_producer_start(callback) {
        Channels.#commands_channel.addEventListener('message', (e) => {
            const command = PRODUCER_COMMAND_TYPE.START;

            if (e.data.command === command) {
                Channels.#debug_channel.postMessage({
                    command,
                    payload: 'producer has started',
                });

                callback();
            }
        });
    }

    static producer_stop() {
        Channels.#commands_channel.postMessage({
            command: PRODUCER_COMMAND_TYPE.STOP,
        });
    }

    static on_producer_stop(callback) {
        Channels.#commands_channel.addEventListener('message', (e) => {
            const command = PRODUCER_COMMAND_TYPE.STOP;

            if (e.data.command === command) {
                Channels.#debug_channel.postMessage({
                    command,
                    payload: 'producer has stopped',
                });

                callback();
            }
        });
    }

    static post_producer_task(payload) {
        const command = PRODUCER_COMMAND_TYPE.TASK;

        Channels.#commands_channel.postMessage({
            command,
            payload,
        });

        Channels.#debug_channel.postMessage({
            command,
            payload,
        });
    }

    static on_producer_post_task(callback) {
        Channels.#commands_channel.addEventListener('message', (e) => {
            if (e.data.command === PRODUCER_COMMAND_TYPE.TASK) {
                callback(e.data.payload);
            }
        });
    }

    // balancer

    static execute_runner_task(payload) {
        const command = RUNNER_COMMAND_TYPE.EXECUTE_TASK;

        Channels.#commands_channel.postMessage({
            command,
            payload,
        });

        Channels.#debug_channel.postMessage({
            command,
            payload,
        });
    }

    static on_execute_runner_task(callback) {
        Channels.#commands_channel.addEventListener('message', (e) => {
            if (e.data.command === RUNNER_COMMAND_TYPE.EXECUTE_TASK) {
                callback(e.data.payload);
            }
        });
    }

    // runner

    static runner_task_complete(payload) {
        const command = RUNNER_COMMAND_TYPE.TASK_COMPLETE;

        Channels.#commands_channel.postMessage({
            command,
            payload,
        });

        Channels.#debug_channel.postMessage({
            command,
            payload,
        });
    }

    static on_runner_task_complete(payload) {
        Channels.#commands_channel.addEventListener('message', (e) => {
            if (e.data.command === RUNNER_COMMAND_TYPE.TASK_COMPLETE) {
                callback(e.data.payload);
            }
        });
    }
}
