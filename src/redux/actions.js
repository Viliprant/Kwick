export const connectUser = (data) => ({
        type: "CONNECT_USER",
        userData: data
});

export const disconnectUser = () => ({
        type: "DISCONNECT_USER"
});