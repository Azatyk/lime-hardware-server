const app = require("express")();
const { io } = require("socket.io-client");

app.get("/", (req, res) => {
  res.send("Client");
});

const socket = io("ws://localhost:3002");

socket.on("qr_scanned", () => {
  console.log("locker opened");
});

app.listen(3001, () => {
  console.log("Server working on 3001 port");
});
