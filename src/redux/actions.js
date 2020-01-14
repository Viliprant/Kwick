export const toggleConnection = () => ({
        type: "TOGGLE_CONNECTION"
});

export const connectUser = (data) => ({
        type: "CONNECT_USER",
        userData: data
});