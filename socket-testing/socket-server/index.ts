import { Socket } from "socket.io";

const app = require("express")();
const { Server } = require("socket.io");
const io = new Server(3002);

function outputMessage(message: string) {
  console.log("----------------------");
  console.log(message);
  console.log("----------------------");
}

// const qrScanned = (socket: Socket) => {
//   outputMessage("QR scanned by user");
//   console.log(io.sockets)
//   socket.emit("qr_scanned");
// };

app.get("/scan", (req: any, res: any) => {
  // qrScanned(socket);
  outputMessage("QR scanned by user");
  io.sockets.emit("qr_scanned");
  res.send("OK");
  res.status(200);
});

io.on("connection", (socket: Socket) => {
  outputMessage("Client connected to server");
  // socket.emit("qr_scanned");

  socket.on("locker_opened", () => {
    outputMessage("Locker opened");
  });

  socket.on("locker_closed", () => {
    outputMessage("Locker closed");
  });

  socket.on("locker_opening_error", () => {
    outputMessage("Locker opening error");
  });

  socket.on("disconnect", (conn) => {
    outputMessage("Client disconnected from server");
  });
});

app.listen(3000, () => {
  console.log("Server working on 3000 port");
});
