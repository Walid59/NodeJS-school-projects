const displayMessage = msg => document.getElementById('content').textContent = msg;

const displayTable = async () => {
    const tasksTable = document.getElementById('list');
    tasksTable.textContent = '';
    const requestOptions = {
        method: 'GET'
    };
    const response = await fetch('/tasks/', requestOptions);
    const alltasks = await response.json();
    for (let task of alltasks) {
        const taskElement = buildTaskElement(task);
        tasksTable.appendChild(taskElement);
    }
}

const buildTaskElement = task => {
    const taskElement = document.createElement('tr');
    taskElement.className = 'task';
    taskElement.appendChild(buildTD(task.description, 'description'));
    taskElement.appendChild(buildTD(`(${task.urgency})`, 'urgency'));
    const getButton = buildButton('read (GET)');
    getButton.addEventListener('click', () => getTask(task._id));
    taskElement.appendChild(getButton);
    const deleteButton = buildButton('delete (DELETE)');
    deleteButton.addEventListener('click', () => deleteTask(task._id, deleteButton));
    taskElement.appendChild(deleteButton);

    return taskElement;
}


const getTask =
    async taskId => {
        const requestOptions = {
            method: 'GET'
        };
        const response = await fetch(`/tasks/${taskId}`, requestOptions)
        const task = await response.json()
        JSONanswer.textContent = JSON.stringify(task);
        window.setTimeout(updateTable, 3000);

    }

const deleteTask =
    async (taskId, button) => {
        const requestOptions = {
            method: 'DELETE'
        };
        const response = await fetch(`/tasks/${taskId}`, requestOptions);
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
    displayTable();
    displayMessage('prêt');
}

// go !
window.addEventListener('DOMContentLoaded', setup);
