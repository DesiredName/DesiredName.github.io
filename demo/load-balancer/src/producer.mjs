import channels from './channels.mjs';
import { PRODUCER_COMMAND_TYPE } from './commands.mjs';

let task_id = 0;
let timer_id = 0;

function submit_task() {
    channels.commands_channel.postMessage({
        command: PRODUCER_COMMAND_TYPE.TASK,
        data: {
            id: task_id,
            name: `task_${task_id}`,
        },
    });

    channels.debug_channel.postMessage({
        command: PRODUCER_COMMAND_TYPE.TASK,
        data: { task_id },
    });

    task_id++;
}

function start() {
    clearInterval(task_id);
    timer_id = setInterval(() => submit_task(), 500);

    channels.debug_channel.postMessage({
        command: PRODUCER_COMMAND_TYPE.START,
        data: 'producer has started',
    });
}

function stop() {
    clearInterval(task_id);

    channels.debug_channel.postMessage({
        command: PRODUCER_COMMAND_TYPE.START,
        data: 'producer has stopped',
    });
}

channels.commands_channel.addEventListener('message', (e) => {
    switch (e.data.command) {
        case PRODUCER_COMMAND_TYPE.START:
            return start();
        case PRODUCER_COMMAND_TYPE.STOP:
            return stop();
    }
});

channels.debug_channel.postMessage({ message: 'producer initialized' });
