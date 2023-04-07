let username;
let description;
let user;
let usernameField;


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
    const myLoanedObjectsTable = document.getElementById('myList');
    objectsTable[0].textContent = '';
    const requestOptions = {
        method: 'GET'
    };
    const response = await fetch('/objects/', requestOptions);
    const allObjects = await response.json();
    for (let object of allObjects) {
        const objectElement = buildObjectElement(object);
        for (const myLoanedObject in user.objectsBorrowed) {
            if(user.objectsBorrowed[myLoanedObject] === object._id)
                await myLoanedObjectsTable.appendChild(await objectElement);
        }
            if(user.objectsBorrowed[0] !== object._id && user.objectsBorrowed[1] !== object._id )
            await objectsTable[0].appendChild(await objectElement);
    }
}


const buildObjectElement = async object => {
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
    else if(user.objectsBorrowed[0] === object._id || user.objectsBorrowed[1] === object._id ){
        for (const myLoanedObject in user.objectsBorrowed){
            if(user.objectsBorrowed[myLoanedObject] === object._id){
                const renderObjectButton = buildButton('rendre l\'objet');
                renderObjectButton.addEventListener('click', () => renderObject(object));
                elem.appendChild(renderObjectButton);
            }
        }
    }

    else{
        if(user.objectsBorrowed.size !== 2){
            const borrowButton = buildButton('Emprunter l\'objet');
            borrowButton.addEventListener('click', () => borrowObject(object));
            elem.appendChild(borrowButton);
        }else{
            const borrowButton = buildButton('limite atteinte');
            borrowButton.disabled = true;
            elem.appendChild(borrowButton);
        }

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

const renderObject =
    async (object) => {
        //deux situations à bien ajouter :
        // -le retrait de l'objet prêté dans la liste des objets prêtés de l'utilisateur (objectBorrowed -> unset)
        // -le retrait de l'emprunteur dans l'objet (borrowerId -> null)


        //on commence par la premiere situation: le retrait de l'objet prêté dans la liste des objets prêtés de l'utilisateur (objectBorrowed -> unset)
        const newObjectData = {...object, $unset: {borrowerId: 1}};
        const objectBody = JSON.stringify(newObjectData);
        const objectRequestOptions = {
            method: 'PUT',
            headers : { "Content-Type": "application/json" },
            body : objectBody
        };
        const response = await fetch(`/objects/${object._id}`, objectRequestOptions);

// On supprime l'objet emprunté de la liste des objets empruntés de l'utilisateur
        const newObjectsBorrowed = user.objectsBorrowed.filter((id) => id !== object._id);
        const newUserData = { $set: { objectsBorrowed: newObjectsBorrowed } };

// On met à jour le document utilisateur
        const userRequestOptions = {
            method: 'PUT',
            headers : { "Content-Type": "application/json" },
            body : JSON.stringify(newUserData)
        };
        const response2 = await fetch(`/user/${object.borrowerId}`, userRequestOptions);
        if(response.ok && response2.ok)
            displayMessage('objet retiré de la liste des emprunts');
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
        const newUserData = { $addToSet: { objectsBorrowed: object._id } };
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

const updateUser =  async () => {
    const userData = { name : usernameField.value };
    const body = JSON.stringify(userData);
    const requestOptions = {
        method :'PUT',
        headers : { "Content-Type": "application/json" },
        body : body
    };
    const response = await fetch('/user/me', requestOptions);
    if (response.ok) {
        const updatedUser = await response.json();
        console.log(`user updated : ${JSON.stringify(updatedUser)}`);
    }
    else {
        const error = await response.json();
        handleError(error);
    }
}

const logout = async () => {
    const requestOptions = {
        method :'GET',
    };
    const response = await fetch(`/access/logout`, requestOptions);
    if (response.ok) {
        window.location.href= '/';
    }
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
