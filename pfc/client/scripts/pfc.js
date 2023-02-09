const socket = io();
const text = document.getElementById("text");
socket.on('playersStatus',(arg) => {
    text.append(arg);

}
);

const submit = document.getElementById("submit");
