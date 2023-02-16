const socket = io();
const text = document.getElementById("text");
socket.on('playersStatus',(arg) => {
    text.append(arg);
    console.log(arg);
}
);
console.log("stpppp");

//const submit = document.getElementById("submit");
//rien ne fonctionne, tout est vide lors du build.