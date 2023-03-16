const displayMessage = msg => document.getElementById('content').textContent = msg;

const displayTable = async () => {
  const tasksTable = document.getElementById('list');
  tasksTable.textContent = '';
  const requestOptions = {
                           method : 'GET'
                         };
  const response = await fetch('/tasks/', requestOptions);
  const alltasks = await response.json();
  for (let task of alltasks) {
    const taskElement = buildTaskElement(task);
    tasksTable.appendChild(taskElement);
  }
}

const buildTaskElement =  task => {
  const taskElement = document.createElement('tr');
  taskElement.className = 'task';
  taskElement.appendChild(buildTD(task.description, 'description'));
  taskElement.appendChild(buildTD(task.urgency, 'urgency'));
  return taskElement;
}

const buildTD = (content, className) => {
  const TDelement = document.createElement('td');
  TDelement.textContent = content;
  TDelement.className = className;
  return TDelement;
}

//creer fonction qui cree des div correpodnant a des taches
const setup = () => {
  displayTable();
  displayMessage('prêt');
}

// go !
setup();
