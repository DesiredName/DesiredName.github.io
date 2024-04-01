export default class Perceptron {
    #n = 0;
    #w0 = 0;
    #w1 = 0;
    #w2 = 0;
    #e = 0;

    constructor(n = 0.2, w0 = -50, w1 = 0.5, w2 = 0.5) {
        this.#n = n;
        this.#w0 = w0;
        this.#w1 = w1;
        this.#w2 = w2;
        this.#e = 0;
    }

    get n() {
        return this.#n;
    }

    set n(v) {
        this.#n = v;
    }

    get has_error() {
        return this.#e === true;
    }

    set has_error(v) {
        return (this.#e = v === true);
    }

    threshold(x) {
        return -(this.#w0 + this.#w1 * x) / this.#w2;
    }

    learn(dataset) {
        this.#e = false;

        const n = this.#n;
        let w0 = this.#w0;
        let w1 = this.#w1;
        let w2 = this.#w2;
        let misclassified = true;

        const max_attempts = dataset.length * 1000;
        let attempt = 0;

        while (misclassified) {
            misclassified = false;

            if (max_attempts < attempt++) {
                this.#e = true;
                break;
            }

            dataset.forEach(({ marker_type, x, y }) => {
                const d = marker_type;
                const t = w0 + w1 * x + w2 * y < 0 ? -1 : 1;

                if (d !== t) {
                    misclassified = true;
                    w0 = w0 + n * (d - t);
                    w1 = w1 + n * (d - t) * x;
                    w2 = w2 + n * (d - t) * y;
                }
            });
        }

        this.#w0 = w0;
        this.#w1 = w1;
        this.#w2 = w2;
    }

    classify({ x, y }) {
        return this.#w0 + this.#w1 * x + this.#w2 * y < 0 ? -1 : 1;
    }
}
