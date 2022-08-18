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
    socket.on("chat", chat => {
        io.sockets.emit("chat", chat);
    });

    socket.on("typing", chat => {
        socket.broadcast.emit("typing", chat);
    });

    socket.on("stopTyping", chat => {
        socket.broadcast.emit("stopTyping", chat);
    });

    socket.on("disconnect", () => {
        io.allSockets().then(r => io.sockets.emit("online", r.size));
    });

    io.allSockets().then(r => io.sockets.emit("online", r.size));
});