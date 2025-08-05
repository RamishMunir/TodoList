let todo= JSON.parse(localStorage.getItem("todo")) || []; 

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");
const deleteButtonS = document.getElementById("deleteButtonS");


// 
document.addEventListener("DOMContentLoaded", function(){
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if(event.key === "Enter"){
            event.preventDefault();
            addTask();
        }
    });

    deleteButton.addEventListener("click", deleteAllTasks);
    deleteButtonS.addEventListener("click", deleteSelectedTasks);
    displayTasks();
});



function addTask(){
    const newTask = todoInput.value.trim();
    if (newTask !== ""){
        todo.push({text: newTask, disabled: false });
        saveToLocalStorage();
        todoInput.value = null;
        displayTasks()
    }
}

function deleteAllTasks(){
    todo = [];
    saveToLocalStorage();
    displayTasks();

}

function displayTasks(){
    todoList.innerHTML= "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML= `
        <div class="flex gap-4">
            <input type="checkbox" class="" id="input-${index}" ${item.disabled ? "checked" : ""}>
            
            <p id="todo-${index}" class="${item.disabled ? "flex line-through text-[#8f98a8]" : "flex gap-4 text-[var(--dark)] items-center"}" onclick="editTask(${index})">
                ${item.text}
            </p>
        
        </div>  `;

        p.querySelector(`#input-${index}`).addEventListener("change", () => {toggleTask(index)});
        todoList.appendChild(p);
    });
    todoCount.textContent = todo.length;
}

function saveToLocalStorage(){
    localStorage.setItem("todo", JSON.stringify(todo));
}

function toggleTask(index){
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks()
}

function editTask(index){
    console.log("works")
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;

    const inputElement = document.createElement("input");
    inputElement.value = existingText;

    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", () => {
        const updatedText = inputElement.value.trim();
        if (updatedText){
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();

    });
}


function deleteSelectedTasks(){
    todo = todo.filter(item => !item.disabled);
    saveToLocalStorage();
    displayTasks();
}