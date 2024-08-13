import express from 'express';
import dotenv from 'dotenv';
import SocketService from './services/socketService';
const { io, server } = new SocketService()
dotenv.config({
    override: true
})

const app = express();
const PORT = process.env.PORT || 8000;




io.on("connection", (socket) => {
    console.log("New Client Connected: " + socket.id);

    socket.on("message:read", () => {
        console.log("New Message")
    } )
})

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})