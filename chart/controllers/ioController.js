// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    #clients;

    constructor(io) {
        this.#io = io;
        this.#clients = new Map();
    }

    registerSocket(socket) {
        console.log(`new connection with id ${socket.id}`);
        this.setupListeners(socket);
    }

    setupListeners(socket) {
        socket.on('pong', () => console.log("pong"))
        socket.on( 'greatings'  , user => this.greatings(socket, user.name) );
        socket.on( 'disconnect' , () => this.leave(socket) );
    }

    greatings(socket, userName) {
        //console.log(`greatings received from ${userName} (id : ${socket.id})`);
        console.log('pong');
        this.#clients.set(socket.id, userName);
        socket.emit('welcome');
    }

    leave(socket) {
        const userName = this.#clients.get(socket.id) || 'unknown';
        console.log(`disconnection from ${socket.id} (user : ${userName})`);
    }
}