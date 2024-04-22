import channels from './channels.mjs';
import {
    BALANCER_COMMAND_TYPE,
    PRODUCER_COMMAND_TYPE,
    RUNNER_COMMAND_TYPE,
} from './commands.mjs';

let queue = [];

const runner_builder = (i) => ({
    q: 0,
    is_busy: false,
    worker: new Worker('./runner.mjs', {
        type: 'module',
        name: 'runner-' + i,
    }),
});

const runners = [runner_builder(1), runner_builder(2), runner_builder(3)];

const add_task = (task) => {
    queue = [task].concat(queue);
    channels.debug_channel.postMessage({
        message: 'balancer queue size: ' + queue.length,
    });
};

const poll_task = () => {
    if (queue.length === 0) {
        return;
    }

    const task = queue.pop();

    let min = Number.POSITIVE_INFINITY;
    let target_index = -1;
    let target_runner = null;

    runners.forEach(({ q, is_busy, worker }, index) => {
        if (is_busy === false && q < min) {
            min = q;
            target_index = index;
            target_runner = worker;
        }
    });

    if (target_runner == null) {
        add_task(task);
    } else {
        target_runner.postMessage({
            command: RUNNER_COMMAND_TYPE.EXECUTE_TASK,
            data: task,
        });
    }
};

channels.commands_channel.addEventListener('message', (e) => {
    switch (e.data.command) {
        case PRODUCER_COMMAND_TYPE.TASK:
            add_task(e.data.data);
            break;
    }
});

channels.debug_channel.postMessage({ message: 'balancer initialized' });

setInterval(poll_task, 500);
