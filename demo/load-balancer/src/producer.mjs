import ChannelsManager from './channels/index.mjs';

let task_id = 0;
let timer_id = 0;
let rps = 1;

function submit_task() {
    ChannelsManager.producer.post_task({
        id: task_id,
    });

    task_id++;
}

function start() {
    timer_id = setInterval(() => submit_task(), 1000 / rps);

    ChannelsManager.stats.producer_rps(rps);
}

function stop() {
    clearInterval(timer_id);
    timer_id = null;
}

function alter_rps(delta) {
    rps = Math.max(1, rps + delta);

    stop();
    start();
}

ChannelsManager.producer.on_start(start);
ChannelsManager.producer.on_stop(stop);
ChannelsManager.producer.on_alter_rps(alter_rps);

ChannelsManager.debug.post_message('Producer: started');
ChannelsManager.stats.producer_rps(rps);
