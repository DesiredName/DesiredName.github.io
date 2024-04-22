const debug_channel = new BroadcastChannel('debug-channel');
const commands_channel = new BroadcastChannel('commands-channel');

export default {
    debug_channel,
    commands_channel,
};
