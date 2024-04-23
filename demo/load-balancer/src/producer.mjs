import ChannelsManager from './channels.mjs';

let task_id = 0;
let timer_id = 0;

function submit_task() {
    ChannelsManager.post_producer_task({
        id: task_id,
    });

    task_id++;
}

function start() {
    timer_id = setInterval(() => submit_task(), 500);
}

function stop() {
    clearInterval(timer_id);
}

ChannelsManager.on_producer_start(start);
ChannelsManager.on_producer_stop(stop);

ChannelsManager.debug_message('Producer: started');
