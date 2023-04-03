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
    let value = await getUser(object);
    span.textContent = `Appartient à : ${value.name}`;
    span.className = 'ownerName';
    elem.appendChild(span);

    if(user.id === value._id) {
        const deleteButton = buildButton('Supprimer l\'objet');
        deleteButton.addEventListener('click', () => deleteObject(object, deleteButton));
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

const getUser = async (object) => {
    const requestOptions = {
        method: 'GET'
    };
    const response = await fetch(`/user/${object.ownerId}`, requestOptions);
    if (response.ok) {
        return await response.json();
    } else {
        const error = await response.json();
        handleError(error);
        return error;
    }
}


const deleteObject =
    async (object, button) => {
        let res1 = true, res2 = true;
        if(object.borrowerId !== undefined){
// On récupère l'utilisateur
        const borrowerRequestOptions = {
            method: 'get'
        };
        const response1 = await fetch(`/user/${object.borrowerId}`, borrowerRequestOptions);
        res1 = response1.ok;
        let borrower = await response1.json();

// On supprime l'objet emprunté de la liste des objets empruntés de l'utilisateur
            const newObjectsBorrowed = borrower.objectsBorrowed.filter((id) => id !== object._id);
            const newUserData = { $set: { objectsBorrowed: newObjectsBorrowed } };

// On met à jour le document utilisateur
        const userRequestOptions = {
            method: 'PUT',
            headers : { "Content-Type": "application/json" },
            body : JSON.stringify(newUserData)
        };
        const response2 = await fetch(`/user/${object.borrowerId}`, userRequestOptions);
        res2 = response2.ok;
    }
//on supprime l'objet
        const requestOptions = {
            method: 'DELETE'
        };
        const response3 = await fetch(`/objects/${object._id}`, requestOptions);
        button.parentNode.replaceChild(createTmpSpan(), button);
        displayMessage('objet supprimé');


        if(response3.ok && res1 && res2) {
            displayMessage('objet supprimé');
        } else {
            displayMessage("erreur dans la suppression");
        }
        window.setTimeout(displayTable, 2000);
    }

const borrowObject =
    async (object) => {
    //deux situations à bien ajouter :
        // -l'ajout de l'utilisateur qui emprunte l'objet dans la table object
        // -l'ajout de l'objet à l'utilisateur dans la table user


        //on commence par la premiere situation: l'ajout de l'utilisateur connecté qui emprunte l'objet dans la table object pour la colonne borrowerId
        const newObjectData = {...object, borrowerId: user.id};
        const objectBody = JSON.stringify(newObjectData);
        const objectRequestOptions = {
            method: 'PUT',
            headers : { "Content-Type": "application/json" },
            body : objectBody
        };
        const response = await fetch(`/objects/${object._id}`, objectRequestOptions);


        //ensuite la deuxieme: l'ajout de l'objectId à l'utilisateur dans la table user pour la colonne objectsBorrowed
        const newUserData = {...user, $push: {objectsBorrowed: { $each:[object._id], $slice:2}} };
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
