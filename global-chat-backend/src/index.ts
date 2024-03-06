import {Server} from "socket.io";

const io = new Server({cors: {origin: "*"}});

io.on("connection", (socket) => {
  console.log(`Conectado: ${socket.id}`);
  socket.emit("private", `Conectado ao servidor com o id: ${socket.id}!`);
  socket.on("message", ({message, username}) => {
    console.log(`Mensagem recebida: ${message} de ${username}`);
    io.emit("global", {id: socket.id, username, message});
  });
});

io.listen(3001);