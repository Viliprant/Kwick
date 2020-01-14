const jsonp = require('jsonp-promise');

export async function promisedJSONP(url, params){
    let promise = await jsonp(url, params).promise;
    return promise;
}

export function verifyStateResponse(response){
    if(response.kwick.status !== 'ok')
    {
        console.log('Il y a eu un problème avec le serveur:', response.kwick.status)
        return false;
    }
    if(response.result.status !== 'done')
    {
        console.log('Il y a eu un problème avec les éléments renseignés:', response.result.message)
        return false;
    }
    return true;
}