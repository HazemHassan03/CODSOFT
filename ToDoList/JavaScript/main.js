let task = document.querySelector(".input");
let add = document.querySelector(".add");
let content = document.querySelector(".tasks");

let id = 0;

if (localStorage.length > 0) {
  for (let i = 0; i < localStorage.length; i++) {
    addTask(localStorage.getItem(`Task${i + 1}`));
  }
}

function addTask(val) {
  if (val === "") {
    return 0;
  }
  let div = document.createElement("div");
  let p = document.createElement("p");
  let pText = document.createTextNode(val);
  let remove = document.createElement("button");
  let removeText = document.createTextNode("Delete");
  let edit = document.createElement("button");
  let editText = document.createTextNode("Edit");
  p.append(pText);
  remove.append(removeText);
  remove.classList.add("remove");
  remove.onmouseover = () => {
    remove.style.backgroundColor = "#eb4848";
  };
  remove.onmouseout = () => {
    remove.style.backgroundColor = "#ff4d4d";
  };
  edit.append(editText);
  edit.classList.add("edit");
  edit.onmouseover = () => {
    edit.style.backgroundColor = "#eb4848";
  };
  edit.onmouseout = () => {
    edit.style.backgroundColor = "#ff4d4d";
  };
  let options = document.createElement("div");
  options.append(edit, remove);
  options.style.cssText = "display: flex; gap: 10px; align-self: center";
  p.style.cssText =
    "align-self: center; overflow:hidden; text-overflow:ellipsis;";
  div.append(p, options);
  div.classList.add("task");
  content.append(div);
  div.style.cssText = `display: flex;
    justify-content: space-between;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    gap: 10px;`;
  remove.style.cssText = `
    border: none;
    background-color: #ff4d4d;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;`;
  edit.style.cssText = `
    border: none;
    background-color: #ff4d4d;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;`;
  ++id;
  div.id = id;
}

function addTaskToLocalStorage(val, num = id) {
  localStorage.setItem(`Task${num}`, val);
}

let tasks = content.children;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();
    localStorage.removeItem(`Task${e.target.parentElement.parentElement.id}`);
    localStorage.clear();
    for (let i = 0; i < tasks.length; i++) {
      addTaskToLocalStorage(tasks[i].childNodes[0].textContent, i + 1);
    }
    id = tasks.length;
  }
});

add.addEventListener("click", (e) => {
  e.preventDefault();
  addTask(task.value);
  addTaskToLocalStorage(task.value);
});

let edit = document.querySelectorAll(".edit");
let editScreen = document.querySelector(".edit-screen");
let overlay = document.querySelector(".overlay");
let editInput = document.getElementById("edit");
let editInputSave = document.getElementById("save");
let editInputClose = document.getElementById("close");
function show() {
  editScreen.style.display = "flex";
  overlay.style.display = "block";
}
function hide() {
  editScreen.style.display = "none";
  overlay.style.display = "none";
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    show();
    editInput.value =
      e.target.parentElement.parentElement.childNodes[0].textContent;
    editInputSave.addEventListener("click", () => {
      if (editInput.value === "") {
        let p = document.createElement("p");
        let pText = document.createTextNode("You must write the task");
        p.append(pText);
        p.style.color = "#ff4d4d";
        p.style.fontWeight = "bold";
        editScreen.append(p);
        setTimeout(() => {
          p.remove();
        }, 3000);
      } else {
        hide();
        e.target.parentElement.parentElement.childNodes[0].textContent =
          editInput.value;
        localStorage.setItem(
          `Task${e.target.parentElement.parentElement.id}`,
          editInput.value
        );
      }
    });
  }
});

editInputClose.addEventListener("click", hide);

let clearAll = document.getElementById("clear-all");
let allTasks = document.querySelectorAll(".task");
clearAll.addEventListener("click", () => {
  allTasks.forEach((task) => {
    task.remove();
    localStorage.clear();
  });
});
