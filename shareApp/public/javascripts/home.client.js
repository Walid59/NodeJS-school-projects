let username;
let description;
let user;


const displayMessage = msg => document.getElementById('content').textContent = msg;

const getCurrentUser = async () => {
    const requestOptions = {
        method: 'GET',
    };
    const response = await fetch('/user/me', requestOptions);
    if (response.ok) {
        user = await response.json();
        username.textContent = `Welcome, ${user.name} !` || '';
    } else {
        const error = await response.json();
        handleError(error);
    }
}

const handleError = error => {
    if (error.redirectTo)
        window.location.href = error.redirectTo;
    else
        console.log(`erreur : ${error.message}`);
}


const displayTable = async () => {
    const objectsTable = document.getElementsByClassName('row');
    objectsTable[0].textContent = '';
    const requestOptions = {
        method: 'GET'
    };
    const response = await fetch('/objects/', requestOptions);
    const allObjects = await response.json();
    for (let object of allObjects) {
        const objectElement = buildObjectsElement(object);
        objectsTable[0].appendChild(objectElement);
    }
}


const buildObjectsElement = object => {
    const elem = buildDIV(object.description, 'description');
    const span = document.createElement('div');
    span.textContent = 'username (TODO)';
    span.className = 'ownerName';
    elem.appendChild(span);

    const deleteButton = buildButton('Supprimer l\'objet');
    deleteButton.addEventListener('click', () => deleteObject(object._id, deleteButton));
    elem.appendChild(deleteButton);

    return elem;
}
const createObject =
    async () => {
        description = document.getElementById('desc');
        const newObjectData = {description: description.value, ownerId: user.id};
        const body = JSON.stringify(newObjectData);
        let requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: body
        };
        try {
            const response = await fetch(`/objects/`, requestOptions);
            const createdObject = await response.json();
            displayMessage(createdObject.description + " ajouté");
            await displayTable();
        } catch (Error) {
            displayMessage("error : restart the app");
        }
    }

const getUser = async (ownerId) => {
    const requestOptions = {
        method: 'GET'
    };
    const response = await fetch(`/user/${ownerId}`, requestOptions);
    const owner = await response.json();
    console.log(owner._id);
    return owner;
}


const deleteObject =
    async (objectId, button) => {
        const requestOptions = {
            method: 'DELETE'
        };
        await fetch(`/objects/${objectId}`, requestOptions);
        button.parentNode.replaceChild(createTmpSpan(), button);
        displayMessage('objet supprimé');
        window.setTimeout(displayTable, 2000);
    }


const createTmpSpan = () => {
    const span = document.createElement('span');
    span.className = 'deleted';
    span.textContent = 'deleted';
    return span;
}

const buildDIV = (content, className) => {
    const DIVelement = document.createElement('div');
    DIVelement.className = "col-sm";
    DIVelement.textContent = content;
    DIVelement.classList.add(className);
    return DIVelement;
}
const buildTD = (content, className) => {
    const TDelement = document.createElement('td');
    TDelement.textContent = content;
    TDelement.className = className;
    return TDelement;
}

const buildButton = label => {
    const button = document.createElement('button');
    button.textContent = label;
    return button;
}


const setup = () => {
    username = document.getElementById('user');
    getCurrentUser();
    document.getElementById('create').addEventListener('click', createObject);
    displayTable();
    displayMessage('Prêt');
}

window.addEventListener('DOMContentLoaded', setup);
