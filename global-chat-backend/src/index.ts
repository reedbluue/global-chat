import {Server} from "socket.io";
import {IMessageRequestDto} from "./dtos/request/IMessageRequestDto/index.js";
import {IMessageDto} from "./dtos/response/IMessageDto/index.js";

const io = new Server({cors: {origin: "*"}});

io.on("connection", (socket) => {
  console.log(`Conectado: ${socket.id}`);
  socket.emit("private", `Conectado ao servidor com o id: ${socket.id}!`);
  socket.on("send", ({message, username}: IMessageRequestDto) => {
    console.log(`Mensagem recebida do usuario: ${username} || ${message}`);
    io.emit("global-message",
        {userId: socket.id, username, message, timestamp: new Date()} as IMessageDto);
  });
});

io.listen(3001);