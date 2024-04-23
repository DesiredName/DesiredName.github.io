import {
    PRODUCER_COMMAND_TYPE,
    DEBUG_INFO_TYPE,
    RUNNER_COMMAND_TYPE,
} from './commands.mjs';

const debug_channel = new BroadcastChannel('debug-channel');
const commands_channel = new BroadcastChannel('commands-channel');

class DebugChannel {
    static post_message(command, payload) {
        debug_channel.postMessage({
            command,
            payload,
        });
    }

    static on_post_message(callback) {
        debug_channel.addEventListener('message', callback);
    }
}

class ProducerChannel {
    static start() {
        commands_channel.postMessage({
            command: PRODUCER_COMMAND_TYPE.START,
        });
    }

    static on_start(callback) {
        commands_channel.addEventListener('message', (e) => {
            const command = PRODUCER_COMMAND_TYPE.START;

            if (e.data.command === command) {
                debug_channel.postMessage({
                    command,
                    payload: 'producer has started',
                });

                callback();
            }
        });
    }

    static stop() {
        commands_channel.postMessage({
            command: PRODUCER_COMMAND_TYPE.STOP,
        });
    }

    static on_stop(callback) {
        commands_channel.addEventListener('message', (e) => {
            const command = PRODUCER_COMMAND_TYPE.STOP;

            if (e.data.command === command) {
                debug_channel.postMessage({
                    command,
                    payload: 'producer has stopped',
                });

                callback();
            }
        });
    }

    static post_task(payload) {
        const command = PRODUCER_COMMAND_TYPE.TASK;

        commands_channel.postMessage({
            command,
            payload,
        });

        debug_channel.postMessage({
            command,
            payload,
        });
    }

    static on_post_task(callback) {
        commands_channel.addEventListener('message', (e) => {
            if (e.data.command === PRODUCER_COMMAND_TYPE.TASK) {
                callback(e.data.payload);
            }
        });
    }
}

class BalancerChannel {
    static execute_task(payload) {
        const command = RUNNER_COMMAND_TYPE.EXECUTE_TASK;

        commands_channel.postMessage({
            command,
            payload,
        });

        debug_channel.postMessage({
            command,
            payload,
        });
    }

    static on_execute_task(callback) {
        commands_channel.addEventListener('message', (e) => {
            if (e.data.command === RUNNER_COMMAND_TYPE.EXECUTE_TASK) {
                callback(e.data.payload);
            }
        });
    }
}

class RunnerChannel {
    static task_complete(payload) {
        const command = RUNNER_COMMAND_TYPE.TASK_COMPLETE;

        commands_channel.postMessage({
            command,
            payload,
        });

        debug_channel.postMessage({
            command,
            payload,
        });
    }

    static on_task_complete(callback) {
        commands_channel.addEventListener('message', (e) => {
            if (e.data.command === RUNNER_COMMAND_TYPE.TASK_COMPLETE) {
                callback(e.data.payload);
            }
        });
    }
}

export default class ChannelsManager {
    static debug = DebugChannel;
    static producer = ProducerChannel;
    static balancer = BalancerChannel;
    static runner = RunnerChannel;
}
