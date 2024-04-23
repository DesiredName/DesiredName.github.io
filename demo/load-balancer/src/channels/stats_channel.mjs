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
    };
}
