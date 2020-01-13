function reducer(state, action) {
    const newState = {...state};

    switch (action.type) {
        case "TOGGLE_CONNECTION":
            newState.isConnected = !newState.isConnected;
            return newState;
        default:
            return state;
    }
}

export default reducer;