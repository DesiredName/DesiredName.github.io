const { threadId, parentPort } = require('node:worker_threads');

// internal state
let timerId = undefined;

parentPort.on('message', (event) => {
    const { name, data } = event;

    console.log(`Worker ${threadId} received request '${name}' from main thread`);

    if (name === 'start') {
        DoSomethingOnStartEvent(
            data,
            (processed_data) => parentPort.postMessage({
                event: 'done',
                threadId,
                data: processed_data
            })
        );
    }
    // else if (name === 'another event') {
    //     DoSomethingOnAnotherEvent(...)
    // } ...
    else if (name === 'terminate') {
        clearTimeout(timerId);
        process.exit(0);
    }
});

function DoSomethingOnStartEvent(data, callback) {
    console.log(`Worker ${threadId} started to process request`, data);
    timerId = setTimeout(() => {
        // do some intensive task, call services, etc.
        console.log(`Worker ${threadId} finised processing`)
        // notify parent the work was done
        callback(data);
    }, 2000 + Math.random() * 2000);
}

// function DoSomethingOnAnotherEvent(data, callback) { ... }