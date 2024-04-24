import { RUNNER_COMMAND_TYPE } from './commands.mjs';

export default function RunnerChannelBuilder({
    commands_channel,
    debug_channel,
}) {
    return {
        task_complete(payload) {
            const command = RUNNER_COMMAND_TYPE.TASK_COMPLETE;

            commands_channel.postMessage({
                command,
                payload,
            });

            debug_channel.postMessage({
                command,
                payload,
            });
        },

        on_task_complete(callback) {
            commands_channel.addEventListener('message', (e) => {
                if (e.data.command === RUNNER_COMMAND_TYPE.TASK_COMPLETE) {
                    callback(e.data.payload);
                }
            });
        },
    };
}
