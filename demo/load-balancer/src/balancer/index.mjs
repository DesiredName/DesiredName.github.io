import ChannelsManager from './../channels/index.mjs';
import QueueManager from './queue_manager.mjs';
import RunnersManager from './runners_manager.mjs';

let timer_id = null;

RunnersManager.spawn_runners(1);
ChannelsManager.producer.on_post_task((task) => {
    QueueManager.add_task(task);

    if (timer_id == null) {
        timer_id = setInterval(poll_task, 500);
    }
});

const poll_task = () => {
    const size = QueueManager.length;

    if (size === 0) {
        ChannelsManager.debug.post_message('Balancer: no tasks to process');
        clearInterval(timer_id);
        timer_id = null;

        return;
    }

    const task = QueueManager.get_task();
    const target_runner_id = RunnersManager.get_free_runner_id();

    if (target_runner_id !== -1) {
        RunnersManager.assign_task(target_runner_id, task);
    } else {
        QueueManager.add_task(task);
    }
};

ChannelsManager.debug.post_message('Balancer: started');
