// Get Elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("task-input");
const filterItems = document.querySelectorAll(".filter-item");
const tasksBoxes = document.querySelector(".tasks-boxes");

// Global Variables
let taskBoxId = 1;
let allTasks = [];

// Add Active Class To Filter item
filterItems.forEach((item) => {
  item.addEventListener("click", () => {
    filterItems.forEach((e) => {
      e.classList.remove("active");
      item.classList.add("active");
    });
  });
});

// Create Add New task function
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = new Date();
  const currentDate = date.toISOString().split("T");
  let taskDate = currentDate[0];
  let taskTime = currentDate[1].split(".")[0];

  //   Validation
  if (!taskInput.value) return alert("Please enter a task");
  const taskValue = taskInput.value;
  taskInput.value = "";
  createTaskBox(taskValue, taskDate, taskTime);
  console.log(allTasks);
});

//   Create Task Box with new task value [Function]
function createTaskBox(taskValue, taskDate, taskTime) {
  const taskBox = document.createElement("div");
  taskBox.className = "task-box";
  taskBox.id = taskBoxId;
  taskBoxId++;

  //   Start task-box-content Div
  const taskBoxContent = document.createElement("div");
  taskBoxContent.className = "task-box-content";

  const taskBoxContentTitle = document.createElement("h4");
  taskBoxContentTitle.className = "tasks-box-content-title";
  const titleText = document.createTextNode(taskValue);
  taskBoxContentTitle.appendChild(titleText);

  const taskBoxContentDate = document.createElement("span");
  taskBoxContentDate.className = "task-box-content-date";
  const dateText = document.createTextNode(`${taskDate} At ${taskTime}`);
  taskBoxContentDate.appendChild(dateText);

  taskBoxContent.appendChild(taskBoxContentTitle);
  taskBoxContent.appendChild(taskBoxContentDate);
  //   End task-box-content Div

  //   Start Task-box-btn-controllers Div

  const taskBoxBtnControllers = document.createElement("div");
  taskBoxBtnControllers.className = "task-box-btn-controllers";

  const taskBoxBtnEdit = document.createElement("button");
  taskBoxBtnEdit.className = "task-box-btn edit-task";
  taskBoxBtnEdit.id = "edit-task";
  const editText = document.createTextNode("Edit");
  taskBoxBtnEdit.appendChild(editText);

  const taskBoxBtnDelete = document.createElement("button");
  taskBoxBtnDelete.className = "task-box-btn delete-task";
  taskBoxBtnDelete.id = "delete-task";
  const deleteText = document.createTextNode("Delete");
  taskBoxBtnDelete.appendChild(deleteText);

  taskBoxBtnControllers.appendChild(taskBoxBtnEdit);
  taskBoxBtnControllers.appendChild(taskBoxBtnDelete);
  //   End Task-box-controllers Div

  taskBox.appendChild(taskBoxContent);
  taskBox.appendChild(taskBoxBtnControllers);

  tasksBoxes.appendChild(taskBox);
  allTasks.push(taskBox);
}

document.addEventListener("click", (e) => {
  // Set Don class to task box
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("done");
  }

  //   Filtering
  // => Display All Tasks
  if (e.target.id === "allTasks") {
    tasksBoxes.innerHTML = "";
    allTasks?.forEach((task) => tasksBoxes.appendChild(task));
  }

  // => Display Finished Tasks
  if (e.target.id === "finishedTasks") {
    tasksBoxes.innerHTML = "";
    allTasks?.forEach((task) => {
      if (task.classList.contains("done")) return tasksBoxes.appendChild(task);
    });
  }

  // => Display Not Finished Tasks
  if (e.target.id === "notFinishedTasks") {
    tasksBoxes.innerHTML = "";
    allTasks?.forEach((task) => {
      if (!task.classList.contains("done")) return tasksBoxes.appendChild(task);
    });
  }

  //   Delete All Tasks
  if (e.target.id === "clear-all") {
    tasksBoxes.innerHTML = "";
    allTasks = [];
  }

  //   Delete Finished Tasks
  if (e.target.id === "clear-finished") {
    tasksBoxes.innerHTML = "";
    allTasks = allTasks.filter((task) => !task.classList.contains("done"));
    allTasks.forEach((task) => tasksBoxes.appendChild(task));
  }

  //   Delete Task
  if (e.target.id === "delete-task") {
    const controllerDiv = e.target.parentNode;
    const currentDiv = controllerDiv.parentNode;

    allTasks = allTasks.filter((task) => task.id !== currentDiv.id);
    tasksBoxes.innerHTML = "";
    allTasks.forEach((task) => tasksBoxes.appendChild(task));
  }

  //   Edit Task
  if (e.target.id === "edit-task") {
    const controllerDiv = e.target.parentNode;
    const currentDiv = controllerDiv.parentNode;
    const currentDivText = currentDiv.children[0].children[0].innerHTML;

    taskInput.value = currentDivText;

    allTasks = allTasks.filter((task) => task.id !== currentDiv.id);
    tasksBoxes.innerHTML = "";
    allTasks.forEach((task) => tasksBoxes.appendChild(task));
  }
});
