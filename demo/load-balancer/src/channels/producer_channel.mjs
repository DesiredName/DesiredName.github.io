import { PRODUCER_COMMAND_TYPE } from './commands.mjs';

export default function ProducerChannelBuilder({
    commands_channel,
    debug_channel,
    stats_channel,
}) {
    return {
        alter_rps(delta) {
            commands_channel.postMessage({
                command: PRODUCER_COMMAND_TYPE.ALTER_RPS,
                payload: delta,
            });
        },

        on_alter_rps(callback) {
            commands_channel.addEventListener('message', (e) => {
                const command = PRODUCER_COMMAND_TYPE.ALTER_RPS;

                if (e.data.command === command) {
                    callback(e.data.payload);
                }
            });
        },

        start() {
            commands_channel.postMessage({
                command: PRODUCER_COMMAND_TYPE.START,
            });
        },

        on_start(callback) {
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
        },

        stop() {
            commands_channel.postMessage({
                command: PRODUCER_COMMAND_TYPE.STOP,
            });
        },

        on_stop(callback) {
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
        },

        post_task(payload) {
            const command = PRODUCER_COMMAND_TYPE.TASK;

            commands_channel.postMessage({
                command,
                payload,
            });

            debug_channel.postMessage({
                command,
                payload,
            });
        },

        on_post_task(callback) {
            commands_channel.addEventListener('message', (e) => {
                if (e.data.command === PRODUCER_COMMAND_TYPE.TASK) {
                    callback(e.data.payload);
                }
            });
        },
    };
}
