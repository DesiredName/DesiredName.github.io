export default function compute_primes(n) {
    // compute N prime numbers
    const primes = [];

    for (let t = 2; t < Number.MAX_SAFE_INTEGER; t++) {
        let is_prime = true;

        for (let m = 2; m < t; m++) {
            is_prime = is_prime && t % m !== 0;
        }

        if (is_prime === true) {
            primes.push(t);
        }

        if (primes.length >= n) break;
    }

    return primes;
}
