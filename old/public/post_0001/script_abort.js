const urls = [
    'https://google.com',
    'https://yahoo.com'
];

async function PerformServiceRequest(url, controller) {
    return fetch(url, { signal: controller.signal }).then((res) => {
        console.log(`Service at ${url} returned response`);

        return res.url;
    });
}

async function GetServiceResponse(urls) {
    const controller = new AbortController();
    const requests = urls.map((url) => {
        return PerformServiceRequest(url, controller);
    });

    const response = await Promise.race(requests)
        .finally(() => {
            controller.abort();
        });

    return response;
}

(async () => {
    const result = await GetServiceResponse(urls);

    console.log(result);
})();