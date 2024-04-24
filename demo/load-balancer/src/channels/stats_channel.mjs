import { STATS_INFO_TYPE } from './commands.mjs';

export default function StatsChannelBuilder(stats_channel) {
    return {
        producer_rps(rps) {
            stats_channel.postMessage({
                command: STATS_INFO_TYPE.PRODUCER_RPS,
                payload: rps,
            });
        },

        on_poducer_rps(callback) {
            stats_channel.addEventListener('message', (e) => {
                if (e.data.command === STATS_INFO_TYPE.PRODUCER_RPS) {
                    callback(e.data.payload);
                }
            });
        },

        //

        balancer_queue_size(queue_size) {
            stats_channel.postMessage({
                command: STATS_INFO_TYPE.BALANCER_QUEUE_SIZE,
                payload: queue_size,
            });
        },

        on_balancer_queue_size(callback) {
            stats_channel.addEventListener('message', (e) => {
                if (e.data.command === STATS_INFO_TYPE.BALANCER_QUEUE_SIZE) {
                    callback(e.data.payload);
                }
            });
        },

        //

        runners_spawned(runners_id) {
            stats_channel.postMessage({
                command: STATS_INFO_TYPE.RUNNERS_RUNNERS_SPWANED,
                payload: runners_id,
            });
        },

        on_runners_spawned(callback) {
            stats_channel.addEventListener('message', (e) => {
                if (
                    e.data.command === STATS_INFO_TYPE.RUNNERS_RUNNERS_SPWANED
                ) {
                    callback(e.data.payload);
                }
            });
        },

        //

        runner_queue_size(payload) {
            stats_channel.postMessage({
                command: STATS_INFO_TYPE.RUNNER_QUEUE_SIZE,
                payload,
            });
        },

        on_runner_queue_size(callback) {
            stats_channel.addEventListener('message', (e) => {
                if (e.data.command === STATS_INFO_TYPE.RUNNER_QUEUE_SIZE) {
                    callback(e.data.payload);
                }
            });
        },
    };
}
