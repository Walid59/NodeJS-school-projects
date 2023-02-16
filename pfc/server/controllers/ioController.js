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
        this.gameUserManager(socket);
    }

    gameUserManager(socket){
        if(socket.id === IOController.#clients[0].id || socket.id === IOController.#clients[1].id ){ //on veut que les deux premiers utilisateurs connectés puissent jouer. ("premier arrivé premier servi")
            if(IOController.#clients.length === 1){
                socket.emit('playersStatus', "waiting for an opponent...");
            }else if(IOController.#clients.length === 2){ 
                IOController.#clients[0].emit('playersStatus','start the game'); // en cas de connexion du deuxieme utilisateur, envoyer au socket qu'il peut lancer une game
                socket.emit('playersStatus','start the game');
            }
        }else{
            socket.emit('playersStatus','2 opponents are currently fighting, please wait the end of the game.');
        }



    }
    setupListeners(socket) {
        socket.on( 'disconnect' , () => this.leave(socket));
    }

    leave(socket) {
        console.log(`disconnection from ${socket.id}`);
        IOController.#clients = IOController.#clients.filter(item => item !== socket);
        for(const client of IOController.#clients){
            this.gameUserManager(client);
            console.log("DONE");
        }
    }

}