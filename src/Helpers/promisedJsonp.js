const jsonp = require('jsonp-promise');

export default async function promisedJSONP(url, params){
    let promise = await jsonp(url, params).promise;
    return promise;
}