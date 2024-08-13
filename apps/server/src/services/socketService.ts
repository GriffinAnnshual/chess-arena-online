import {Server, Socket} from 'socket.io'
import http from 'http'

class SocketService {
    private _io: Server;
    private _server;
    constructor(){
        const server = http.createServer();
        this._io = new Server(server, {
            cors: {
                allowedHeaders: ["*"],
                origin: ["*"]
            },
        })
        this._server = server

    }

    get io(): Server {
        return this._io;
    }

    get server() {
        return this._server;
    }
}   




export default SocketService;