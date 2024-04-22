import channels from './channels.mjs';
import { RUNNER_COMMAND_TYPE } from './commands.mjs';

let queue_tasks = [];
let running_tasks = [];

addEventListener('message', (e) => {
    switch (e.data.command) {
        case RUNNER_COMMAND_TYPE.EXECUTE_TASK:
            console.log(e.data.data);
            break;

        default:
            break;
    }
});

channels.debug_channel.postMessage({
    message: `runner "${self.name}" has started`,
});
