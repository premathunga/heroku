const WebSocket = require('ws');

const wss = new WebSocket.Server({ noServer: true });

const connectedClients = new Set();

wss.on("connection", function connection(ws) {
  connectedClients.add(ws);

  ws.on("message", function message(data) {
    // Received a message from a client
    console.log("received: %s", data);

    // Broadcast the message to all connected clients
    for (const client of connectedClients) {
      if (client !== ws) {
        client.send(data);
      }
    }
  });
});

module.exports = wss;
