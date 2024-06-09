export const sendEvent = (socket, type, payload) => {
    socket.send(
        JSON.stringify({
          type,
          meta: {
            from: "client",
            time: new Date().toLocaleString()
          },
          payload
        }),
      );
}