// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    //#intervalID;
    //static #clients = new Map();

    constructor(io) {
        this.#io = io;
    }

    registerSocket(socket) {
        console.log(`new connection with id ${socket.id}`);
        //IOController.#clients.push(socket);
        this.setupListeners(socket);
        // if(IOController.#clients.length === 1){
        // }else if(IOController.#clients.length === 2){
        //     socket.emit('start the game');
        // }else{
        //     socket.emit('2 opponents are currently fighting, please wait the end of the game.');
        // }
        //socket.emit('playersStatus', "waiting for an opponent...");
    }

    setupListeners(socket) {
        socket.on( 'disconnect' , () => this.leave(socket));
    }

    leave(socket) {
        console.log(`disconnection from ${socket.id}`);
        //IOController.#clients = IOController.#clients.filter(item => item !== socket);
    }

}