//creating tasks array
let tasks = [];

//initializing values using ID
const taskList = document.getElementById("list");
var addTaskInput = document.getElementById("todo-input");
const tasksCounter = document.getElementById("tasks-counter");
const addbutton = document.getElementById("addtask");

//function to add task to Dom
function addToDom(task) {
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" id='${task.id}' data-id="${task.id}" ${
    task.done ? "checked" : ""
  } class="custom-checkbox">
      <label id="task-text" for="${task.id}">${task.text}</label>
      <i class="fa-solid fa-trash" id='delete' data-id="${task.id}"></i>`;

  taskList.append(li);
}

//function to render the tasks
function renderList() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addToDom(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}

//function mark the tasks as completed
function markTaskAsComplete(taskId) {
  const completedTask = tasks.filter(function (task) {
    return task.id === taskId;
  });
  if (completedTask.length > 0) {
    const currentTask = completedTask[0];
    currentTask.done = !currentTask.done;
    renderList();
    return;
  }
}

//function to filter all tasks
function AllTasks() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addToDom(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}

//function to filter completed tasks
function CompletedTasks() {
  taskList.innerHTML = "";
  const completedTask = tasks.filter(function (task) {
    return task.done === true;
  });
  for (let i = 0; i < completedTask.length; i++) {
    addToDom(completedTask[i]);
  }
}

//function to filter pending tasks
function NotCompletedTasks() {
  taskList.innerHTML = "";
  const pendingTask = tasks.filter(function (task) {
    return task.done === false;
  });
  for (let i = 0; i < pendingTask.length; i++) {
    addToDom(pendingTask[i]);
  }
}

//function to delete completed tasks
function deleteCompletedTasks() {
  const newTasks = tasks.filter(function (task) {
    return task.done === false;
  });
  tasks = newTasks;
  renderList();
}

//function to delete specific task
function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });
  tasks = newTasks;
  renderList();
}

//fuction to delete all tasks
function DeleteAllTasks() {
  tasks = [];
  renderList();
}

//function to add tasks
function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    return;
  }
}

//fuction to create tasks
function createTask() {
  const text = addTaskInput.value;
  if (text) {
    const task = {
      text,
      id: Date.now().toString(),
      done: false,
    };
    addTaskInput.value = "";
    addTask(task);
  }
}

//add button listener
addbutton.addEventListener("click", createTask);

//adding event listener
document.addEventListener("click", function (e) {
  const target = e.target;
  if (target.id === "delete") {
    const targetId = target.dataset.id;
    deleteTask(targetId);
    return;
  } else if (target.className === "custom-checkbox") {
    const toggleId = target.id;
    markTaskAsComplete(toggleId);
    return;
  } else if (target.id === "Delete-completed") {
    deleteCompletedTasks();
    return;
  } else if (target.id === "all") {
    AllTasks();
    return;
  } else if (target.id === "pending") {
    NotCompletedTasks();
    return;
  } else if (target.id === "completed") {
    CompletedTasks();
    return;
  } else if (target.id === "Delete-All") {
    DeleteAllTasks();
    return;
  }
});
