import channels from './channels.mjs';
import { RUNNER_COMMAND_TYPE } from './commands.mjs';

let queue = [];
let is_busy = false;

const add_task = (task) => {
    queue = [task].concat(queue);
    channels.debug_channel.postMessage({
        message: `runner "${self.name}" queue size: ${queue.length}`,
    });
};

const poll_task = () => {
    if (is_busy === true || queue.length === 0) {
        return;
    } else {
        is_busy = true;

        execute_task();
    }
};

const execute_task = () => {
    setTimeout(() => {
        /* emulate some random running task */
        const _ = queue.pop();
        /* set available for the next task */
        is_busy = false;
        /* notify balancer the slot is empty */
        channels.commands_channel.postMessage({
            command: RUNNER_COMMAND_TYPE.TASK_COMPLETE,
            data: { id: self.name },
        });
    }, 500 * (1 + Math.random()));
};

addEventListener('message', (e) => {
    switch (e.data.command) {
        case RUNNER_COMMAND_TYPE.EXECUTE_TASK:
            return add_task(e.data.data);

        default:
            break;
    }
});

channels.debug_channel.postMessage({
    message: `runner "${self.name}" has started`,
});

setInterval(poll_task, 100);
