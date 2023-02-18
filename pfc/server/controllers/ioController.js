// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    gameStarted = false;
    static #clients = [];

    static rounds  = 5;
    currentRound = 1;
    scorePlayer1 = 0;
    scorePlayer2 = 0;

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
                    IOController.#clients[0].removeAllListeners('playerPick');
                    IOController.#clients[1].removeAllListeners('playerPick');
                    this.playGame();
                    this.gameStarted = false;
                }
            }
        } else {
            socket.emit('playersStatus', '2 opponents are currently fighting, please wait the end of the game. (=> the disconnection of one of the 2 players)', false);
        }
    }


    playGame() {
        let player1, player2;
        player1 = IOController.#clients[0];
        player2 = IOController.#clients[1];
        player1.emit('playersStatus', 'Player 1 : Game started. The disconnection of one of the 2 players cancels the game.', true);
        player2.emit('playersStatus', 'Player 2 : Game started. The disconnection of one of the 2 players cancels the game.', true);

        player1.emit("round",`There are ${IOController.rounds} rounds. Current round : ${this.currentRound}. player1 : ${this.scorePlayer1} , player2 : ${this.scorePlayer2}`);
        player2.emit("round",`There are ${IOController.rounds} rounds. Current round : ${this.currentRound}, player1 : ${this.scorePlayer1} , player2 : ${this.scorePlayer2}`);

        //cas où le player1 est le premier à selectionner le RPC.
        player1.on('playerPick', (choice1) => {
            console.log(`Player 1 chose ${choice1}`);
            player2.emit('playerStatus', "The opponent has validated his choice, please submit yours.", choice1);

            player2.on('playerPick', (choice2) => {
                console.log(`Player 2 chose ${choice2}`);
                player1.emit('playerStatus', "The opponent has validated his choice, please submit yours.", choice2);

                this.endOfTheGame(player1,player2);
                this.currentRound++;


            });
        });

        //cas où le player2 est le premier à selectionner le RPC.
        player2.on('playerPick', (choice1) => {
            console.log(`Player 1 chose ${choice1}`);
            player1.emit('playerStatus', "The opponent has validated his choice, please submit yours.", choice1);

            player2.on('playerPick', (choice2) => {
                console.log(`Player 2 chose ${choice2}`);
                player2.emit('playerStatus', "The opponent has validated his choice, please submit yours.", choice2);
                this.endOfTheGame(player1,player2);
                this.currentRound++;

            });
        });
        if(this.currentRound === IOController.rounds){
            this.scorePlayer1 = 0;
            this.scorePlayer2 = 0;
            this.currentRound = 0;
        }

    }

    endOfTheGame(player1, player2){ //permet de ne pas dupliquer le code
        player1.on("win",(hasWin) => {
            if(hasWin)
                this.scorePlayer1++;
        });
        player2.on("win",(hasWin2) => {
            if(hasWin2)
                this.scorePlayer2++;
        });
        player1.emit("result");
        player2.emit("result");

        player1.removeAllListeners('playerPick');
        player2.removeAllListeners('playerPick');
        this.playGame();
    }
    setupListeners(socket) {
        socket.on('disconnect', () => this.leave(socket));
    }

    leave(socket) {
        console.log(`disconnection from ${socket.id}`);
        IOController.#clients = IOController.#clients.filter(item => item !== socket);
        for (const client of IOController.#clients) {
            this.gameManager(client);
        }
    }
}