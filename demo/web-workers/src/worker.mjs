import compute_primes from './primes.mjs';

addEventListener('message', (e) => {
    const buffer = e.data;
    const view = new Int32Array(buffer);
    const result = compute_primes(view.length);

    view.set(result, 0);

    postMessage(buffer, [buffer]);
});
