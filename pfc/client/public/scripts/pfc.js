const socket = io();
let chosenPickFromUser;
let canDisable;
let chosenPickFromOpponent;

//cette variable permet d'obtenir de déterminer la victoire du client
// en fonction de son choix et celui de son adversaire.
const gameResult = new Map();
gameResult.set(["rock","rock"].toString(),0);
gameResult.set(["rock","paper"].toString(),-1);
gameResult.set(["rock","scissors"].toString(),1);

gameResult.set(["paper","rock"].toString(),1);
gameResult.set(["paper","paper"].toString(),0);
gameResult.set(["paper","scissors"].toString(),-1);

gameResult.set(["scissors","rock"].toString(),-1);
gameResult.set(["scissors","paper"].toString(),1);
gameResult.set(["scissors","scissors"].toString(),0);


//cette socket permet d'ecrire a tel endroit de l'id text au fichier html si le joueur est en partie ou non
//en fonction de son placement dans la liste d'attente et du nombre de joueur.
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

//cette socket permet d'obtenir le status de l'adversaire s'il a pick ou non un element du jeu (PFC).
socket.on('playerStatus', (arg, arg2) => {
    const text2 = document.getElementById("opponentResult");
    text2.innerHTML = "";
    text2.append(arg);
    chosenPickFromOpponent = arg2;
    console.log("l'adversaire a choisi:",chosenPickFromOpponent);
});

//permet à l'utilisateur de pick la pierre, feuille ou ciseaux, sans pour autant l'envoyer au serveur
let elementsArray = document.querySelectorAll('.RPS');
elementsArray.forEach(function (elem) {
    elem.addEventListener("click",function () {
        chosenPickFromUser = elem.id;
        console.log("clicked!", chosenPickFromUser);
        if(canDisable)
            document.getElementById("submit").disabled = false;
    });
});

//permet d'obtenir le resultat final en fonction du choix du joueur et de son adversaire
socket.on("result", () => {
    let res, response;
    const text3 = document.getElementById("opponentResult");
    text3.innerHTML = "";

    res = gameResult.get([chosenPickFromUser,chosenPickFromOpponent].toString());
    if(res === 0){
        response = `Tie. (${chosenPickFromOpponent})`;
        socket.emit("win", false);
    }
    else if(res === 1){
        response = `Win ! Ennemy took ${chosenPickFromOpponent}.`;
        socket.emit("win", true);
    }
    else if(res === -1){
        response = `Lose... Ennemy took ${chosenPickFromOpponent}.`;
        socket.emit("win", false);
    }
else{
        console.log("error");
    }
    text3.append(response);
    socket.emit("gameFinished");
});

//permet d'envoyer au server le pick du joueur.
const submit = document.querySelector("#submit");
submit.addEventListener("click",function (){
    console.log("on envoie au serveur la reponse du joueur: ", chosenPickFromUser);
    socket.emit('playerPick', chosenPickFromUser);
    submit.disabled = true; //permet de lock le choix du joueur une fois le bouton appuyé.
});

//permet d'afficher les rounds et le score respectif de chaque joueur.
socket.on('round', (phrase) => {
        const text = document.getElementById("round");
        text.innerHTML = "";
        text.append(phrase);
    }
);