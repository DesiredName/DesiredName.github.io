import ChannelsManager from './channels/index.mjs';

let task_id = 0;
let timer_id = 0;

function submit_task() {
    ChannelsManager.producer.post_task({
        id: task_id,
    });

    task_id++;
}

function start() {
    const timeout = 300;
    const rps = 1000 / timeout;

    timer_id = setInterval(() => submit_task(), 500);

    ChannelsManager.stats.producer_rps(rps);
}

function stop() {
    clearInterval(timer_id);
}

ChannelsManager.producer.on_start(start);
ChannelsManager.producer.on_stop(stop);

ChannelsManager.debug.post_message('Producer: started');
