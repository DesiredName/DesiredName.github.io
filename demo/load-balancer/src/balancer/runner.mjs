import ChannelsManager from './../channels/index.mjs';

const runner_id = self.name;

let queue = [];
let is_busy = false;
let timer_id = null;

const add_task = (task) => {
    queue = [task].concat(queue);

    if (timer_id === null) {
        timer_id = setInterval(poll_task, 100);
    }
};

const poll_task = () => {
    if (queue.length === 0) {
        clearInterval(timer_id);
        timer_id = null;
    } else if (is_busy === false) {
        ChannelsManager.debug.post_message({
            message: `runner "${runner_id}" queue size: ${queue.length}`,
        });

        is_busy = true;

        execute_task();
    }

    ChannelsManager.stats.runner_queue_size({
        runner_id,
        q: queue.length,
    });
};

const execute_task = () => {
    setTimeout(() => {
        /* emulate some random running task */
        const _ = queue.pop();

        /* set available for the next task */
        is_busy = false;

        /* notify balancer the slot is empty */
        ChannelsManager.runner.task_complete({
            runner_id,
            status: 'ok',
        });
    }, 500 * Math.random());
};

ChannelsManager.balancer.on_execute_task((payload) => {
    if (runner_id === payload.runner_id) {
        add_task(payload.task);
    }
});

ChannelsManager.debug.post_message(`Runner "${runner_id}" started`);
