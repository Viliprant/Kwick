import {createStore} from 'redux';
import reducers from './reducers';

const initialState = {
    id: 1,
    token: null
}

export default createStore(reducers, initialState)