// SELECTING
const myClick = document.querySelector(".myclick");
const myList = document.querySelector(".mylist");
const myInput = document.querySelector(".myinput");
const myFilter = document.querySelector(".filter-todo");


// EVENT LISTENERS
myClick.addEventListener("click", addItem);
myList.addEventListener("click", deleteMe);
myFilter.addEventListener("click", filterOption);

document.addEventListener("DOMContentLoaded", getTodos);





// FUNCTIONS
function addItem(e) {

  //prevent from submiting form (here we dont have form )
  e.preventDefault();

  //creating div to put check and delte btns inside and then putting it inside the myList.
  const newDiv = document.createElement("div");
  newDiv.classList.add("newdiv");
  myList.appendChild(newDiv);
  const newItem = document.createElement("li");
  newItem.classList.add("newitem");
  newItem.innerText = myInput.value;
  // ADDING TO LOCALSTORAGE
  // we should add it before we make myInput.value = ""; because in local storage anything you type will show as an empty string like "" cause the value of yout input is set to ""
  saveLocal(myInput.value);

  newDiv.appendChild(newItem);
  myInput.value = "";



  // adding the checked btn
  const checkBtn = document.createElement("button");
  checkBtn.classList.add("check");
  checkBtn.innerHTML = '<i class="lni lni-checkmark"></i>';
  newDiv.appendChild(checkBtn);

  // adding the trash btn
  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash");
  trashBtn.innerHTML = '<i class="lni lni-trash"></i>';
  newDiv.appendChild(trashBtn);
}

function deleteMe(e) {
  const myTarget = e.target;
  // delete list
  if (myTarget.classList[0] === "trash") {
    const list = myTarget.parentElement;
    // create class to add the remove animation
    list.classList.add("fal");
    removeTodos(list);
    // we removed the remove() here because it removed the animation before it took effect
    list.addEventListener("transitionend", function () {
      list.remove();
    });

  }
  if (myTarget.classList[0] === "check") {
    const list = myTarget.parentElement;
    list.classList.toggle("complete");
  }
}

function filterOption(e) {
  const todos = [...myList.children];
  todos.forEach(function (newdiv) {
    switch (e.target.value) {
      case "all":
        newdiv.style.display = "flex";
        break;
      case "completed":
        if (newdiv.classList.contains("complete")) {
          newdiv.style.display = "flex";
        } else {
          newdiv.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!newdiv.classList.contains("complete")) {
          newdiv.style.display = "flex";
        }
        else {
          newdiv.style.display = "none";
        }
        break;
    }

  });

}




function saveLocal(list) {
  // check if we have anything in localstorage
  let todos;
  if (localStorage.getItem("todos") === null) {
    // if not then create an empty array
    todos = [];
    // if we do have it then get it back with parsing it with JSON
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));

  }
  // then push the retrieved string from local storage to todos key as a value.
  todos.push(list);
  //set todos to local storage and stringfy it
  localStorage.setItem("todos", JSON.stringify(todos));

}

function getTodos() {
  // check to see if we have anything in local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    // if not then create an empty array
    todos = [];
    // if we do have it then get it back with parsing it with JSON
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));

  }
  todos.forEach(function (list) {
    //creating div to put check and delte btns inside and then putting it inside the myList.
    const newDiv = document.createElement("div");
    newDiv.classList.add("newdiv");
    myList.appendChild(newDiv);
    const newItem = document.createElement("li");
    newItem.classList.add("newitem");
    newItem.innerText = list;

    newDiv.appendChild(newItem);
    myInput.value = "";



    // adding the checked btn
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check");
    checkBtn.innerHTML = '<i class="lni lni-checkmark"></i>';
    newDiv.appendChild(checkBtn);

    // adding the trash btn
    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash");
    trashBtn.innerHTML = '<i class="lni lni-trash"></i>';
    newDiv.appendChild(trashBtn);

  });

}

function removeTodos(list) {

  // check if we have anything in localstorage
  let todos;
  if (localStorage.getItem("todos") === null) {
    // if not then create an empty array
    todos = [];
    // if we do have it then get it back with parsing it with JSON
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));

  }

  const listIndex = list.children[0].innerText;
  todos.splice(todos.indexOf(listIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));


}
















