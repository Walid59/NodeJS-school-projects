let username;
let description;


const displayMessage = msg => document.getElementById('content').textContent = msg;

const getUser = async () => {
    const requestOptions = {
        method :'GET',
    };
    const response = await fetch('/user/me', requestOptions);
    if (response.ok) {
        const user = await response.json();
        username.value = user.name || '';
    }
    else {
        const error = await response.json();
        handleError(error);
    }
}

const displayTable = async () => {
    const objectsTable = document.getElementById('list');
    objectsTable.textContent = '';
    const requestOptions = {
        method: 'GET'
    };
    const response = await fetch('/objects/', requestOptions);
    const allObjects = await response.json();
    for (let object of allObjects) {
        const objectElement = buildTaskElement(object);
        objectsTable.appendChild(objectElement);
    }
}

const buildTaskElement = object => {
    const objectElement = document.createElement('tr');
    objectElement.className = 'object';
    objectElement.appendChild(buildTD(object.description, 'description'));
    objectElement.appendChild(buildTD(`(${object.ownerId.name})`, 'ownerName'));
    const getButton = buildButton('read (GET)');
    getButton.addEventListener('click', () => getTask(object._id));
    objectElement.appendChild(getButton);
    const deleteButton = buildButton('delete (DELETE)');
    deleteButton.addEventListener('click', () => deleteTask(object._id, deleteButton));
    objectElement.appendChild(deleteButton);

    return objectElement;
}

const createObject =

    async () => {
        description = document.getElementById('desc');
        const newObjectData = { description : description, ownerId: getUser()};
        const body = JSON.stringify(newObjectData);
        let requestOptions = {
            method :'POST',
            headers : { "Content-Type": "application/json" },
            body : body
        };
        const response = await fetch(`/objects/`, requestOptions);
        const createdObject = await response.json();
        JSONanswer.textContent = JSON.stringify(createdObject);
        displayMessage("ajouté");
        window.setTimeout( updateTable, 3000);
    }


const getTask =
    async objectId => {
        const requestOptions = {
            method: 'GET'
        };
        const response = await fetch(`/objects/${objectId}`, requestOptions)
        const object = await response.json()
        JSONanswer.textContent = JSON.stringify(object);
        window.setTimeout(updateTable, 3000);

    }

const deleteTask =
    async (objectId, button) => {
        const requestOptions = {
            method: 'DELETE'
        };
        const response = await fetch(`/objects/${objectId}`, requestOptions);
        const received = await response.json();
        JSONanswer.textContent = JSON.stringify(received);
        button.parentNode.replaceChild(createTmpSpan(), button);
        window.setTimeout(updateTable, 3000);
        displayMessage('supprimé');

    }

const updateTable = () => {
    JSONanswer.textContent = '';
    updateTable();
}


const createTmpSpan = () => {
    const span = document.createElement('span');
    span.className = 'deleted';
    span.textContent = 'deleted';
    return span;
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
    getUser();
    document.getElementById('user').textContent = `Welcome, ${username} !`;
    document.getElementById('create').addEventListener('click', createObject);
    displayMessage('stp');
}

// go !
window.addEventListener('DOMContentLoaded', setup);
