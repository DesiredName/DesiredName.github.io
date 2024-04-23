import { RUNNER_COMMAND_TYPE } from './commands.mjs';

export default function BalancerChannelBuilder({
    commands_channel,
    debug_channel,
    stats_channel,
}) {
    return {
        execute_task(payload) {
            const command = RUNNER_COMMAND_TYPE.EXECUTE_TASK;

            commands_channel.postMessage({
                command,
                payload,
            });

            debug_channel.postMessage({
                command,
                payload,
            });
        },

        on_execute_task(callback) {
            commands_channel.addEventListener('message', (e) => {
                if (e.data.command === RUNNER_COMMAND_TYPE.EXECUTE_TASK) {
                    callback(e.data.payload);
                }
            });
        },
    };
}
