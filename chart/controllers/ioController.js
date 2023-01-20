// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    #intervalID;
    static #clients = new Map();
    //static #intervalID = setInterval(IOController.sendRandomVal.bind(IOController), 2000);


    constructor(io) {
        this.#io = io;
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
        clearInterval(IOController.#clients.delete(socket));
    }

/*      static sendRandomVal(){
        const randomVal = IOController.RandomIntInclusive(2,8);
        IOController.#clients.forEach((values,keys)=>{
            keys.emit("val",randomVal);
          })
    } */

    sendRandomVal(socket){
        const randomVal = IOController.RandomIntInclusive(2,8);
        socket.emit("val",randomVal);
    }


    setupInterval(socket){
        this.#intervalID = setInterval(this.sendRandomVal.bind(this), 2000, socket);
        //IOController.#clients.set(socket , IOController.#intervalID);
        IOController.#clients.set(socket , this.#intervalID);
    } 

    static RandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
      }
}