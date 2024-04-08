const bc = new BroadcastChannel('common-broadcast-channel-id');

export default class BroadcastHelper {
    #username = `user_${performance.now().toString(16).slice(-3)}`;
    #listener = ({ username, time, message }) => {
        console.log({
            username,
            time,
            message,
        });
    };

    constructor(username) {
        this.#username = this.#username ?? username;

        bc.addEventListener('message', (e) =>
            this.#listener({
                username: e.data.username,
                time: e.data.time,
                message: e.data.message,
            }),
        );
    }

    set onmessage(listener) {
        this.#listener = listener;
    }

    message(message) {
        bc.postMessage({
            username: this.#username,
            time: Date.now(),
            message: message,
        });
    }
}
