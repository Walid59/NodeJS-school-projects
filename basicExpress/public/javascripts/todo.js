const displayMessage = msg => document.getElementById('content').textContent = msg;

const displayTable = async () => {
  const tasksTable = document.getElementById('list');
  tasksTable.textContent = '';
  const requestOptions = {
                           method : 'GET'
                         };
  const response = await fetch('/todo/', requestOptions)
  const alltasks = await response.json()
}

//creer fonction qui cree des div correpodnant a des taches
const setup = () => {
  displayMessage('prêt');
}

// go !
setup();
