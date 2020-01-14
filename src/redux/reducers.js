function reducer(state, action) {
    const newState = {...state};

    switch (action.type) {
        case "TOGGLE_CONNECTION":
            newState.isConnected = !newState.isConnected;
            return newState;
        case "CONNECT_USER":
            newState.id = action.userData.id;
            newState.token = action.userData.token;
            return newState;
        case "DISCONNECT_USER":
            newState.id = null;
            newState.token = null;
            return newState;
        default:
            return state;
    }
}

export default reducer;