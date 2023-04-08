let username;
let description;
let user;
let usernameField;


const displayMessage = msg => document.getElementById('content').textContent = msg;

const updateUser = async () => {
    const userData = {name: usernameField.value};
    const body = JSON.stringify(userData);
    const requestOptions = {
        method: 'PUT', headers: {"Content-Type": "application/json"}, body: body
    };
    const response = await fetch('/user/me', requestOptions);
    if (response.ok) {
        const updatedUser = await response.json();
        console.log(`user updated : ${JSON.stringify(updatedUser)}`);
        await getCurrentUser();
    } else {
        const error = await response.json();
        handleError(error);
    }
}

const logout = async () => {
    const requestOptions = {
        method: 'GET',
    };
    const response = await fetch(`/access/logout`, requestOptions);
    if (response.ok) {
        window.location.href = '/';
    }
}


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
    if (error.redirectTo) window.location.href = error.redirectTo; else console.log(`erreur : ${error.message}`);
}


const displayTable = async () => {
    const objectsTable = document.getElementById('availableObjects');
    const myBorrowedObjectsTable = document.getElementById('myList');


    objectsTable.textContent = '';
    myBorrowedObjectsTable.textContent = '';

    const requestOptions = {
        method: 'GET'
    };
    const response = await fetch('/objects/', requestOptions);
    const allObjects = await response.json();

    for (let object of allObjects) {
        const objectElement = buildObjectElement(object);
        if(user.objectsBorrowed[0] === object._id) await myBorrowedObjectsTable.appendChild(await objectElement);
        else if(user.objectsBorrowed[1] === object._id) await myBorrowedObjectsTable.appendChild(await objectElement);
        else if(user.id === object.ownerId) await myBorrowedObjectsTable.appendChild(await objectElement);
        else objectsTable.appendChild(await objectElement);
    }

}


const buildObjectElement = async object => {
    const elem = buildDIV(object.description, 'description');
    const span = document.createElement('div');
    let value = await getUser(object);
    span.textContent = `Appartient à : ${value.name}`;
    span.className = 'ownerName';
    elem.appendChild(span);

    //si l'id du propriétaire correspond à celui de l'utilisateur, l'utilisateur peut supprimer l'objet
    if (user.id === value._id) {
        const deleteButton = buildButton('Supprimer l\'objet');
        deleteButton.addEventListener('click', () => deleteObject(object, deleteButton));
        elem.appendChild(deleteButton);
    }

    //si le premier objet l'utilisateur correspond à l'id de l'objet, l'utilisateur peut rendre l'objet
    else if (user.objectsBorrowed[0] === object._id) {
        const renderObjectButton = buildButton('rendre l\'objet');

        renderObjectButton.addEventListener('click', () => renderObject(object));
        elem.appendChild(renderObjectButton);

    //si le deuxieme objet l'utilisateur correspond à l'id de l'objet, l'utilisateur peut rendre l'objet
    } else if (user.objectsBorrowed[1] === object._id) {
        const renderObjectButton = buildButton('rendre l\'objet');

        renderObjectButton.addEventListener('click', () => renderObject(object));
        elem.appendChild(renderObjectButton);

    //sinon c'est un objet qui ne lui appartient pas, il peut donc l'emprunter (s'il a pas dépassé la limite et que l'objet est disponible)
    } else {

        const borrowButton = buildButton('Emprunter l\'objet');

        //si l'utilisateur a déjà 2 objets ou bien que l'objet est déjà emprunté, on lui empeche de pouvoir emprunter d'autres objets.
        const isBorrowed = object.borrowerId !== undefined;
        const limitSizeExceeded = user.objectsBorrowed.length === 2;
        borrowButton.disabled = limitSizeExceeded || isBorrowed;
        if(isBorrowed)
            borrowButton.textContent = 'Indisponible';
        else if (limitSizeExceeded)
            borrowButton.textContent = 'Limite atteinte';
        borrowButton.addEventListener('click', () => borrowObject(object));
        elem.appendChild(borrowButton);
    }
    return elem;
}

const createObject = async () => {
    description = document.getElementById('desc');
    const newObjectData = {description: description.value, ownerId: user.id};
    const body = JSON.stringify(newObjectData);
    let requestOptions = {
        method: 'POST', headers: {"Content-Type": "application/json"}, body: body
    };
    try {
        const response = await fetch(`/objects/`, requestOptions);
        const createdObject = await response.json();
        displayMessage(createdObject.description + " ajouté");
        displayTable();
    } catch (Error) {
        displayMessage("error : restart the app");
    }
}

const renderObject = async (object) => {
    //deux situations à bien ajouter :
    // -le retrait de l'objet prêté dans la liste des objets prêtés de l'utilisateur (objectBorrowed -> unset)
    // -le retrait de l'emprunteur dans l'objet (borrowerId -> null)


    //on commence par la premiere situation: le retrait de l'objet prêté dans la liste des objets prêtés de l'utilisateur (objectBorrowed -> unset)
    const newObjectData = {$unset: {borrowerId: ''}};
    const objectBody = JSON.stringify(newObjectData);
    const objectRequestOptions = {
        method: 'PUT', headers: {"Content-Type": "application/json"}, body: objectBody
    };
    const response = await fetch(`/objects/${object._id}`, objectRequestOptions);

// On supprime l'objet emprunté de la liste des objets empruntés de l'utilisateur
    const newObjectsBorrowed = user.objectsBorrowed.filter((id) => id !== object._id);
    const newUserData = {$set: {objectsBorrowed: newObjectsBorrowed}};

// On met à jour le document utilisateur
    const userRequestOptions = {
        method: 'PUT', headers: {"Content-Type": "application/json"}, body: JSON.stringify(newUserData)
    };
    const response2 = await fetch(`/user/${object.borrowerId}`, userRequestOptions);
    if (response.ok && response2.ok) {
        displayMessage('objet retiré de la liste des emprunts');
        displayTable();
    }
    displayMessage('erreur quand on rend l\'objet');
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


const deleteObject = async (object, button) => {
    let res1 = true, res2 = true;
    if (object.borrowerId !== undefined) {
// On récupère l'utilisateur
        const borrowerRequestOptions = {
            method: 'get'
        };
        const response1 = await fetch(`/user/${object.borrowerId}`, borrowerRequestOptions);
        res1 = response1.ok;
        let borrower = await response1.json();

// On supprime l'objet emprunté de la liste des objets empruntés de l'utilisateur
        const newObjectsBorrowed = borrower.objectsBorrowed.filter((id) => id !== object._id);
        const newUserData = {$set: {objectsBorrowed: newObjectsBorrowed}};

// On met à jour le document utilisateur
        const userRequestOptions = {
            method: 'PUT', headers: {"Content-Type": "application/json"}, body: JSON.stringify(newUserData)
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

    if (response3.ok && res1 && res2) {
        displayMessage('objet supprimé');
        displayTable();
    } else {
        displayMessage("erreur dans la suppression");
    }
}


const borrowObject = async (object) => {
    //deux situations à bien ajouter :
    // -l'ajout de l'utilisateur qui emprunte l'objet dans la table object
    // -l'ajout de l'objet à l'utilisateur dans la table user


    //on commence par la premiere situation: l'ajout de l'utilisateur connecté qui emprunte l'objet dans la table object pour la colonne borrowerId
    const newObjectData = {borrowerId: user.id};
    const objectBody = JSON.stringify(newObjectData);
    const objectRequestOptions = {
        method: 'PUT', headers: {"Content-Type": "application/json"}, body: objectBody
    };
    const response = await fetch(`/objects/${object._id}`, objectRequestOptions);


    //ensuite la deuxieme: l'ajout de l'objectId à l'utilisateur dans la table user pour la colonne objectsBorrowed
    const newUserData = {$push: {objectsBorrowed: object._id}};
    const userBody = JSON.stringify(newUserData);
    const userRequestOptions = {
        method: 'PUT', headers: {"Content-Type": "application/json"}, body: userBody
    };
    const response2 = await fetch(`/user/${user.id}`, userRequestOptions);
    if (response.ok && response2.ok) {
        displayMessage('objet emprunté');
        await displayTable();
    } else displayMessage("erreur dans l'emprunt");
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
    usernameField = document.getElementById('username');


    getCurrentUser();
    document.getElementById('create').addEventListener('click', createObject);
    document.getElementById('update').addEventListener('click', updateUser);
    document.getElementById('logout').addEventListener('click', logout);


    displayTable();
    displayMessage('Prêt');
}

window.addEventListener('DOMContentLoaded', setup);
