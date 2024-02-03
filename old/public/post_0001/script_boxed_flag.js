const urls = [
    'https://google.com',
    'https://yahoo.com'
];

async function PerformServiceRequest(url, abort_flag) {
    const execution_stopped_mark = 'execution stopped';

    return fetch(url).then((res) => {
        if (abort_flag.abort === true) {
            throw execution_stopped_mark;
        }

        return res;
    }).then((res) => {
        console.log(`Service at ${url} returned response`);

        return res.url;
    }).catch((ex) => {
        if (ex !== execution_stopped_mark) {
            throw ex;
        }
    });
}

async function GetServiceResponse(urls) {
    const abort_flag = { abort: false };
    const requests = urls.map((url) => {
        return PerformServiceRequest(url, abort_flag);
    });

    const response = await Promise.race(requests)
        .finally(() => {
            abort_flag.abort = true;
        });

    return response;
}

(async () => {
    const result = await GetServiceResponse(urls);

    console.log(result);
})();