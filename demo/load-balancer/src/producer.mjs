import ChannelsManager from './channels.mjs';

let task_id = 0;
let timer_id = 0;

function submit_task() {
    ChannelsManager.producer.post_task({
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

ChannelsManager.producer.on_start(start);
ChannelsManager.producer.on_stop(stop);

ChannelsManager.debug.post_message('Producer: started');
