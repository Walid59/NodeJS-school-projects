// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    //#intervalID;
    static #clients = new Array();

    constructor(io) {
        this.#io = io;
    }

    registerSocket(socket) {
        console.log(`new connection with id ${socket.id}`);
        IOController.#clients.push(socket);
        this.setupListeners(socket);
        this.gameManager(socket);
    }

    gameManager(socket){
        if(socket.id === IOController.#clients[0].id || socket.id === IOController.#clients[1].id ){ //on veut que les deux premiers utilisateurs connectés puissent jouer. ("premier arrivé premier servi")
            if(IOController.#clients.length === 1){
                socket.emit('playersStatus', "waiting for an opponent...", false);
            }else{
                this.startGame(socket);
            }
        }else{
            socket.emit('playersStatus','2 opponents are currently fighting, please wait the end of the game. (=> the disconnection of one of the 2 players)', false);
        }
    }


    startGame(socket){
        IOController.#clients[0].emit('playersStatus','Game started. The disconnection of one of the 2 players cancels the game.', true); // en cas de connexion du deuxieme utilisateur, envoyer au socket qu'il peut lancer une game
        socket.emit('playersStatus','Game started. The disconnection of one of the 2 players cancels the game.', true);
    }
    setupListeners(socket) {
        socket.on( 'disconnect' , () => this.leave(socket));
    }

    leave(socket) {
        console.log(`disconnection from ${socket.id}`);
        IOController.#clients = IOController.#clients.filter(item => item !== socket);
        for(const client of IOController.#clients){
            this.gameManager(client);
        }
    }

}