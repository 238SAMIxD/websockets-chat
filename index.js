import express from "express";
import open from "open";
import { Server } from "socket.io";

const app = express();
const PORT = 1234;

app.use(express.static("public"));

const server = app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
    // open(`http://localhost:${PORT}`);
});

const io = new Server(server);
io.on("connection", socket => {
    console.log(socket);

    socket.on("chat", chat => {
        io.sockets.emit("chat", chat);
    });
});