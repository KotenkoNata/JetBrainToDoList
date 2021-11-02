let addBtn = document.getElementById('add-task-button');
let inputField = document.getElementById('input-task');
let checkboxInput = document.querySelectorAll('[type = "checkbox"]');
let taskListElement = document.getElementById('task-list');

let taskList = [];


//delete data from taskList

const deleteDataTaskList = (id)=>{
    for(let i=0; i<taskList.length; i++){
        if ( taskList[i].id === id) {
            taskList.splice(i, 1);
        }
    }
    saveDataToLocalStorage();
}



//create li elements from local storage data
const createListFromLocalData = (data) =>{

    for(let i=0; i<=data.length-1; i++){

        let newLiElement = document.createElement('li');
        let newInputElement = document.createElement('input');
        let newSpanElement = document.createElement('span');
        let newButtonElement = document.createElement('button');

        newInputElement.type = 'checkbox';
        newInputElement.onchange = function (e){
            if(e.path[1].children[1].classList.contains('checked')){
                e.path[1].children[1].classList.remove('checked');
            }else{
                e.path[1].children[1].classList.add('checked');
            }
        }

        newSpanElement.className = 'task';

        newButtonElement.innerHTML = 'x';
        newButtonElement.className = 'delete-btn';
        newButtonElement.id = `${data[i].id}`

        newButtonElement.onclick=function (e) {
            deleteDataTaskList(e.path[0].id);
            e.path[1].remove();
        }

        let node = document.createTextNode(`${data[i].value}`);

        newLiElement.appendChild(newInputElement);
        newLiElement.appendChild(newSpanElement);
        newLiElement.appendChild(newButtonElement);

        newSpanElement.appendChild(node);

        taskListElement.appendChild(newLiElement);
    }
}



//update data from local storage during reloading page
window.addEventListener('load', (event) => {
    loadDataFromLocalStorage();
    createListFromLocalData(taskList);
});

//create new li - add task button

let onAddNewTask = function (ev) {

    let taskValue = inputField.value;

    if (taskValue !== '') {

        //write data to task list

        let id = 'id'+(new Date()).getTime();

        const firstObject = {
            id: id,
            value: taskValue
        };

        taskList.push(firstObject);

        saveDataToLocalStorage("tasks", taskList);

        let newLiElement = document.createElement('li');
        let newInputElement = document.createElement('input');
        let newSpanElement = document.createElement('span');
        let newButtonElement = document.createElement('button');

        newInputElement.type = 'checkbox';

        newInputElement.onchange = function (e){
            if(e.path[1].children[1].classList.contains('checked')){
                e.path[1].children[1].classList.remove('checked');
            }else{
                e.path[1].children[1].classList.add('checked');
            }
        }

        newSpanElement.className = 'task';

        newButtonElement.innerHTML = 'x';
        newButtonElement.className = 'delete-btn';
        newButtonElement.id = `${id}`;

        newButtonElement.onclick = function (e) {
            deleteDataTaskList(e.path[0].id);
            e.path[1].remove();
        }

        let node = document.createTextNode(`${taskValue}`);

        newLiElement.appendChild(newInputElement);
        newLiElement.appendChild(newSpanElement);
        newLiElement.appendChild(newButtonElement);

        newSpanElement.appendChild(node);

        taskListElement.appendChild(newLiElement);

        inputField.value = '';
    }
};

addBtn.onclick = onAddNewTask;

//delete item

let callbackfn = (buttonEl) => {
    buttonEl.addEventListener('click', evt => {
        deleteDataTaskList(evt.path[0].id);
        evt.path[1].remove();
    })
};

document.querySelectorAll('.delete-btn').forEach(callbackfn);


//save data to local storage

const saveDataToLocalStorage = () =>{
    const task = JSON.stringify(taskList);
    localStorage.setItem("tasks", task);
};

//load data from local storage
const loadDataFromLocalStorage = () =>{
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];
}

