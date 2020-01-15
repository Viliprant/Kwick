import {createStore} from 'redux';
import reducers from './reducers';

let initialState = {
    id: null,
    token: null,
    timeLastAction: null
}
const kwickSessionStorage = sessionStorage.getItem("kwick");
if(kwickSessionStorage)
{
    initialState = JSON.parse(sessionStorage.getItem("kwick"));
}

export default createStore(reducers, initialState)