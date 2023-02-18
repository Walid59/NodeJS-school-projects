const socket = io();
let chosenPickFromUser;
let canDisable;
let chosenPickFromOpponent;

const gameResult = new Map();
gameResult.set(["rock","rock"].toString(),"it's a tie of: ");
gameResult.set(["rock","paper"].toString(),`you have lose, opponent chose `);
gameResult.set(["rock","scissors"].toString(),`you have win, opponent chose `);

gameResult.set(["paper","rock"].toString(),`you have win, opponent chose `);
gameResult.set(["paper","paper"].toString(),"it's a tie of: ");
gameResult.set(["paper","scissors"].toString(),`you have lose, opponent chose `);

gameResult.set(["scissors","rock"].toString(),`you have lose, opponent chose `);
gameResult.set(["scissors","paper"].toString(),`you have win, opponent chose `);
gameResult.set(["scissors","scissors"].toString(),"it's a tie of: ");


socket.on('playersStatus', (args, args2) => {
        const text = document.getElementById("text");
        text.innerHTML = "";
        text.append(args);
        if(!args2){
            document.getElementById("submit").disabled = true;
            canDisable = false;
        }else{
            canDisable = true;
        }
    }
);

socket.on('playerStatus', (arg, arg2) => {
    const text2 = document.getElementById("opponentResult");
    text2.innerHTML = "";
    text2.append(arg);
    chosenPickFromOpponent = arg2;
    console.log("l'adversaire a choisi:",chosenPickFromOpponent);
});

let elementsArray = document.querySelectorAll('.RPS');
elementsArray.forEach(function (elem) {
    elem.addEventListener("click",function () {
        chosenPickFromUser = elem.id;
        console.log("clicked!", chosenPickFromUser);
        if(canDisable)
            document.getElementById("submit").disabled = false;
    });
});

socket.on("result", () => {
    const text3 = document.getElementById("opponentResult");
    text3.innerHTML = "";
    text3.append(gameResult.get([chosenPickFromUser,chosenPickFromOpponent].toString()), chosenPickFromOpponent);
    socket.emit("gameFinished");
});

const submit = document.querySelector("#submit");
submit.addEventListener("click",function (){
    console.log("on envoie au serveur la reponse du joueur: ", chosenPickFromUser);
    socket.emit('playerPick', chosenPickFromUser);
    submit.disabled = true;
});