// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    #clients;
    #intervalID;

    constructor(io) {
        this.#io = io;
        this.#clients = new Map();
    }

    registerSocket(socket) {
        console.log(`new connection with id ${socket.id}`);
        socket.emit("ping"); //send ping to client
        this.setupListeners(socket);
        this.setupInterval(socket);
    }

    setupListeners(socket) {
        socket.on("pong", () => console.log('pong from ', socket.id)); //receive pong from client
        socket.on( 'disconnect' , () => this.leave(socket) );
    }

    leave(socket) {
        console.log(`disconnection from ${socket.id}`);
        clearInterval(this.#intervalID);
    }

    sendRandomVal(socket){
        const randomVal = this.RandomIntInclusive(2,8);
        socket.emit("val",randomVal);
    }

    setupInterval(socket){
        this.#intervalID = setInterval(this.sendRandomVal.bind(this), 2000, socket);
    }

    RandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
      }
}