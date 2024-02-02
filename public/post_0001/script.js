const urls = [
    'https://google.com',
    'https://yahoo.com'
];

async function PerformServiceRequest(url) {
    return fetch(url).then((res) => {
        console.log(`Service at ${url} returned response`);

        return res.url;
    });
}

async function GetServiceResponse(urls) {
    const requests = urls.map((url) => {
        return PerformServiceRequest(url);
    });

    const response = await Promise.race(requests);

    return response;
}

(async () => {
    const result = await GetServiceResponse(urls);

    console.log(result);
})();