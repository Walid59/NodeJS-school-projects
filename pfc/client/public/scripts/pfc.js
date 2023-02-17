const socket = io();

socket.on('playersStatus', (arg, arg2) => {
        const text = document.getElementById("text");
        text.innerHTML = "";
        text.append(arg);
        if (arg2) {
            document.querySelectorAll('button.RPS').forEach(elem => {
                elem.disabled = false;
            });
        }
    }
);
//const submit = document.getElementById("submit");