import channels from './channels.mjs';
import {
    DEBUG_INFO_TYPE,
    RUNNER_COMMAND_TYPE,
    PRODUCER_COMMAND_TYPE,
} from './commands.mjs';

let queue = [];

const runner_builder = (i) => ({
    id: 'runner-' + i,
    q: 0,
    worker: new Worker('./runner.mjs', {
        type: 'module',
        name: 'runner-' + i,
    }),
});

const runners = [runner_builder(1), runner_builder(2), runner_builder(3)];
const runners_x_id = runners.reduce(
    (acc, runner) => acc.set(runner.id, runner),
    new Map(),
);

const add_task = (task) => {
    queue = [task].concat(queue);
    channels.debug_channel.postMessage({
        message: 'balancer queue size: ' + queue.length,
    });
};

const poll_task = () => {
    const size = queue.length;

    channels.debug_channel.postMessage({
        type: DEBUG_INFO_TYPE.BALANCER_QUEUE_SIZE,
        data: { size },
    });

    if (size === 0) {
        return;
    }

    const task = queue.pop();

    let min = Number.POSITIVE_INFINITY;
    let target_index = -1;
    let target_runner = null;

    runners.forEach(({ q, worker }, index) => {
        if (q < min) {
            min = q;
            target_index = index;
            target_runner = worker;
        }
    });

    if (target_runner == null) {
        add_task(task);
    } else {
        runners[target_index].q++;
        target_runner.postMessage({
            command: RUNNER_COMMAND_TYPE.EXECUTE_TASK,
            data: task,
        });
    }
};

const mark_runner_has_empty_slot = (id) => {
    runners_x_id.get(id).q--;
};

channels.commands_channel.addEventListener('message', (e) => {
    switch (e.data.command) {
        case PRODUCER_COMMAND_TYPE.TASK:
            return add_task(e.data.data);
        case RUNNER_COMMAND_TYPE.TASK_COMPLETE:
            return mark_runner_has_empty_slot(e.data.data.id);
    }
});

channels.debug_channel.postMessage({ message: 'balancer initialized' });
channels.debug_channel.postMessage({
    type: DEBUG_INFO_TYPE.BALANCER_RUNNERS_SIZE,
    data: { size: runners.length },
});
channels.debug_channel.postMessage({
    type: DEBUG_INFO_TYPE.BALANCER_QUEUE_SIZE,
    data: { size: queue.length },
});

setInterval(poll_task, 500);
