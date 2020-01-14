import {createStore} from 'redux';
import reducers from './reducers';

const initialState = {
    id: null,
    token: null
}

export default createStore(reducers, initialState)