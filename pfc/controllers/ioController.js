// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    #intervalID;
    static #clients = new Map();

    constructor(io) {
        this.#io = io;
    }

    registerSocket(socket) {
        console.log(`new connection with id ${socket.id}`);
        this.setupListeners(socket);
        this.setupInterval(socket);
    }

    setupListeners(socket) {
        socket.on( 'disconnect' , () => this.leave(socket) );
    }

    leave(socket) {
        console.log(`disconnection from ${socket.id}`);
        clearInterval(IOController.#clients.delete(socket));
    }

}