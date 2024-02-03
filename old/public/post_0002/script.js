const { Worker } = require('node:worker_threads');

function BuildWorker(controller) {
    const worker = new Worker('./worker.js');

    controller.signal.addEventListener(
        'abort',
        () => worker.postMessage({ name: 'terminate' })
    );

    return worker;
}

function BuildWorkers(threads, controller) {
    const workers = new Array(threads)
        .fill(0)
        .map(() => BuildWorker(controller));

    return workers;
}

function PrepareAsyncTask(worker) {
    return new Promise((res, rej) => {
        worker.on('message', ({
            event,
            ...data
        }) => {
            if (event === 'done') {
                res(data);
            }
        });
        worker.on('exit', res);
        worker.on('error', rej);
    });
}

function PrepareAsyncTasks(workers) {
    return workers.map((worker) => PrepareAsyncTask(worker));
}

async function GetTaskResult(data, threads) {
    const controller = new AbortController();
    const workers = BuildWorkers(threads, controller);
    const tasks = PrepareAsyncTasks(workers);

    workers.forEach((worker) => worker.postMessage({ name: 'start', data }));

    const response = await Promise.race(tasks)
        .catch(console.log)
        .finally(() => {
            controller.abort();
        });

    return response;
}

(async () => {
    const data = ['some', 'data', 'to', 'process'];
    const result = await GetTaskResult(data, 10);

    console.log(result);
})();