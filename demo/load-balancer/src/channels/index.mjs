const debug_channel = new BroadcastChannel('debug-channel');
const commands_channel = new BroadcastChannel('commands-channel');
const stats_channel = new BroadcastChannel('stats-channel');

import DebugChannelBuilder from './debug_channel.mjs';
import ProducerChannelBuilder from './producer_channel.mjs';
import BalancerChannelBuilder from './balancer_channel.mjs';
import RunnerChannelBuilder from './runner_channel.mjs';
import StatsChannelBuilder from './stats_channel.mjs';

export default class ChannelsManager {
    static debug = DebugChannelBuilder(debug_channel);
    static producer = ProducerChannelBuilder({
        commands_channel,
        debug_channel,
    });
    static balancer = BalancerChannelBuilder({
        commands_channel,
        debug_channel,
    });
    static runner = RunnerChannelBuilder({
        commands_channel,
        debug_channel,
    });
    static stats = StatsChannelBuilder(stats_channel);
}
