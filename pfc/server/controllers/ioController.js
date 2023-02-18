// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    gameStarted = false;
    static #clients = [];

    constructor(io) {
        this.#io = io;
    }

    registerSocket(socket) {
        console.log(`new connection with id ${socket.id}`);
        IOController.#clients.push(socket);
        this.setupListeners(socket);
        this.gameManager(socket);
    }

    gameManager(socket) {
        if (socket.id === IOController.#clients[0].id || socket.id === IOController.#clients[1].id) { //on veut que les deux premiers utilisateurs connectés puissent jouer. ("premier arrivé premier servi")
            if (IOController.#clients.length === 1) {
                socket.emit('playersStatus', "waiting for an opponent...", false);
                this.gameStarted = false;
                console.log("game started: ", this.gameStarted);
            } else {
                if (!this.gameStarted) {
                    this.gameStarted = true;
                    this.startGame();
                    this.gameStarted = false;
                }
            }
        } else {
            socket.emit('playersStatus', '2 opponents are currently fighting, please wait the end of the game. (=> the disconnection of one of the 2 players)', false);
        }
    }


    startGame() {
        console.log("game started: ", this.gameStarted);
        IOController.#clients[0].emit('playersStatus', 'Player 1 : Game started. The disconnection of one of the 2 players cancels the game.', true); // en cas de connexion du deuxieme utilisateur, envoyer au socket qu'il peut lancer une game
        IOController.#clients[1].emit('playersStatus', 'Player 2 : Game started. The disconnection of one of the 2 players cancels the game.', true);
        this.gameListener();
    }

    setupListeners(socket) {
        socket.on('disconnect', () => this.leave(socket));
    }

    gameListener() {
        let hasSent, hasSent2 = false;
        if (this.gameStarted) {
            let setResult, setResult2 = false;
            if (!hasSent) {
                IOController.#clients[0].on('playerPick', (arg1) => {
                    console.log("le premier joueur a validé son choix");
                    //socket emit client[1] que le client 0 a validé son choix
                    IOController.#clients[1].emit('playerStatus', "The opponent has validated his choice, please submit yours.", arg1);
                    //faire en sorte sur le pfc.js de vérifier quel joueur a gagné grace au arg.
                    setResult = true;
                    if (setResult && setResult2) {
                        IOController.#clients[0].emit("result", null);
                        IOController.#clients[1].emit("result", null);
                    }
                    hasSent = true;
                });
            }

            if (!hasSent2) {
                IOController.#clients[1].on('playerPick', (arg) => {
                    console.log("le deuxieme joueur a validé son choix");
                    //socket emit client[0] que le client 1 a validé son choix
                    IOController.#clients[0].emit('playerStatus', "The opponent has validated his choice, please submit yours.", arg);
                    //faire en sorte sur le pfc.js de vérifier quel joueur a gagné grace au arg.
                    setResult2 = true;
                    if (setResult && setResult2) {
                        IOController.#clients[0].emit("result");
                        IOController.#clients[1].emit("result");
                    }
                    hasSent = true;
                });
            }
        }
    }

    leave(socket) {
        console.log(`disconnection from ${socket.id}`);
        IOController.#clients = IOController.#clients.filter(item => item !== socket);
        for (const client of IOController.#clients) {
            this.gameManager(client);
        }
    }

}