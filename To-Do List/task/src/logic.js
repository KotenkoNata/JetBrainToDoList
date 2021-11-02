let addBtn = document.getElementById('add-task-button');
let inputField = document.getElementById('input-task');

let checkboxInput = document.querySelectorAll('[type = "checkbox"]');

let taskListElement = document.getElementById('task-list');

let taskList = [];

let onAddNewTask = function (ev) {

    let task = inputField.value;

    if (task !== '') {

        let id = 'id'+(new Date()).getTime();

        saveData(id, inputField.value);

        let newLiElement = document.createElement('li');
        let newInputElement = document.createElement('input');
        let newSpanElement = document.createElement('span');
        let newButtonElement = document.createElement('button');

        newInputElement.type = 'checkbox';

        newSpanElement.className = 'task';

        newButtonElement.innerHTML = 'x';
        newButtonElement.className = 'delete-btn';

        newButtonElement.onclick=function (e) {
                e.path[1].remove();
        }

        let node = document.createTextNode(`${task}`);

        newLiElement.appendChild(newInputElement);
        newLiElement.appendChild(newSpanElement);
        newLiElement.appendChild(newButtonElement);

        newSpanElement.appendChild(node);

        taskListElement.appendChild(newLiElement);

        inputField.value = '';
    }
};

addBtn.onclick = onAddNewTask;

document.querySelectorAll('.delete-btn').forEach((value, i) => {
    value.addEventListener('click', evt => {
        evt.path[1].remove()
    })
})

checkboxInput.forEach((value, i)=>{
    value.addEventListener('change', e=>{

        if(e.path[1].children[1].classList.contains('checked')){
            e.path[1].children[1].classList.remove('checked');
        }else{
            e.path[1].children[1].classList.add('checked');
        }


    })
})

const saveData = (key, value) =>{
    const task = JSON.stringify(value);
    localStorage.setItem(key, task);
}

