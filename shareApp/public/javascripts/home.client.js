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
        await objectsTable[0].appendChild(await objectElement);
    }
}


const buildObjectsElement = async object => {
    const elem = buildDIV(object.description, 'description');
    const span = document.createElement('div');
    let value = await getUser(object.ownerId);
    span.textContent = `Appartient à : ${value.name}`;
    span.className = 'ownerName';
    elem.appendChild(span);

    if(user.id === value._id) {
        const deleteButton = buildButton('Supprimer l\'objet');
        deleteButton.addEventListener('click', () => deleteObject(object._id, deleteButton));
        elem.appendChild(deleteButton);
    }
    else{
        const borrowButton = buildButton('Emprunter l\'objet');
        borrowButton.addEventListener('click', () => borrowObject(object));
        elem.appendChild(borrowButton);
    }
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
    if (response.ok) {
        return await response.json();
    } else {
        const error = await response.json();
        handleError(error);
    }
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

const borrowObject =
    async (object) => {
    //deux situations à bien ajouter :
        // -l'ajout de l'utilisateur qui emprunte l'objet dans la table object
        // -l'ajout de l'objet à l'utilisateur dans la table user
        //on commence par la premiere situation: l'ajout de l'utilisateur connecté qui emprunte l'objet dans la table object pour la colonne borrowerId
        //ensuite la deuxieme: l'ajout de l'objectId à l'utilisateur dans la table user pour la colonne objectsBorrowed

        const newObjectData = {...object, borrowerId: user.id};
        const objectBody = JSON.stringify(newObjectData);
        const objectRequestOptions = {
            method: 'PUT',
            headers : { "Content-Type": "application/json" },
            body : objectBody
        };
        const response = await fetch(`/objects/${object._id}`, objectRequestOptions);

        const newUserData = {...user, $push: {objectsBorrowed: object._id} };
        const userBody = JSON.stringify(newUserData);
        const userRequestOptions = {
            method: 'PUT',
            headers : { "Content-Type": "application/json" },
            body : userBody
        };
        const response2 = await fetch(`/user/${user.id}`, userRequestOptions);
        if(response.ok && response2.ok)
            displayMessage('objet emprunté');
        else
            displayMessage("erreur dans l'emprunt");
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
