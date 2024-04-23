export default function DebugChannelBuilder(channel) {
    return {
        post_message(command, payload) {
            channel.postMessage({
                command,
                payload,
            });
        },

        on_post_message(callback) {
            channel.addEventListener('message', callback);
        },
    };
}
