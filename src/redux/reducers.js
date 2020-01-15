function reducer(state, action) {
    const newState = {...state};

    switch (action.type) {
        case "CONNECT_USER":
            newState.id = action.userData.id;
            newState.token = action.userData.token;
            newState.timeLastAction = Date.now();
            sessionStorage.setItem('kwick', JSON.stringify(newState));
            return newState;
        case "DISCONNECT_USER":
            newState.id = null;
            newState.token = null;
            newState.timeLastAction = null;
            sessionStorage.setItem('kwick', JSON.stringify(newState));
            return newState;
        case "UPDATE_TIMESTAMP":
            newState.timeLastAction = Date.now();
            sessionStorage.setItem('kwick', JSON.stringify(newState));
            return newState;
        default:
            return state;
    }
}

export default reducer;