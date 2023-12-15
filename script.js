import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js";

document.addEventListener("DOMContentLoaded", function () {
  // Start: Bootstrap Modal Initialization
  const addTodoModal = new Modal(document.getElementById("addTodo"));
  // End: Bootstrap Modal Initialization

  const todoList = document.querySelector(".list-group");

  // Function to update "No todo available" message
  function updateNoTodoMessage() {
    const noTodoMessageIcon = todoList.querySelector(".fa-ban");
    if (todoList.children.length === 0) {
      // Add "No todo available" icon if there are no todos
      if (!noTodoMessageIcon) {
        const newNoTodoMessageIcon = document.createElement("i");
        newNoTodoMessageIcon.classList.add("fa-solid", "fa-ban");
        todoList.appendChild(newNoTodoMessageIcon);
      }
    } else {
      // Remove "No todo available" icon if there are todos
      if (noTodoMessageIcon) {
        noTodoMessageIcon.remove();
      }
    }
  }

  // Initial "No todo available" message
  updateNoTodoMessage();

  // Error containers for each input
  const dateErrorContainer = document.getElementById("dateError");
  const fullNameErrorContainer = document.getElementById("fullNameError");
  const nickNameErrorContainer = document.getElementById("nickNameError");

  function displayError(container, message) {
    // Clear previous error messages
    container.innerHTML = "";

    // Display new error message
    const errorMessage = document.createElement("p");
    errorMessage.innerText = message;
    container.appendChild(errorMessage);
  }

  function createTodoItem(title, date, name) {
    // Start: Create Todo Item
    const listItem = document.createElement("li");
    listItem.classList.add(
      "todo__item",
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "w-100",
      "py-2",
      "list-group-item"
    );

    listItem.innerHTML = `
      <div class="todo__item--left d-flex justify-content-between align-items-center">
        <div class="todo__left--content">
          <h5 class="card-subtitle">${title}</h5>
          <p class="text-body-secondary m-0"><span class="date">${date}</span> | <span class="name">${name}</span></p>
        </div>
        <div class="todo__left--check">
          <button class="btn done d-none rounded-circle">
            <i class="fa-solid fa-check"></i>
          </button>
        </div>
      </div>
      <div class="todo__item--right">
        <button class="btn" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><button class="dropdown-item mark-done" type="button">Mark as done</button></li>
          <li><button class="dropdown-item delete-todo" type="button">Delete</button></li>
        </ul>
      </div>
    `;
    // End: Create Todo Item

    const markDoneBtn = listItem.querySelector(".mark-done");
    const deleteTodoBtn = listItem.querySelector(".delete-todo");

    // Start: Mark as Done Button Event Listener
    markDoneBtn.addEventListener("click", function () {
      console.log("Mark as done clicked");
      const checkMark = listItem.querySelector(".done");
      checkMark.classList.toggle("d-none");

      // Update "No todo available" message
      updateNoTodoMessage();
    });
    // End: Mark as Done Button Event Listener

    // Start: Delete Todo Button Event Listener
    deleteTodoBtn.addEventListener("click", function () {
      listItem.remove();
      console.log("Delete clicked");

      // Update "No todo available" message
      updateNoTodoMessage();
    });
    // End: Delete Todo Button Event Listener

    return listItem;
  }

  // Start: Save Todo Button Event Listener
  const saveTodoBtn = document.querySelector("#saveTodoBtn");

  saveTodoBtn.addEventListener("click", function () {
    // Clear previous error messages
    dateErrorContainer.innerHTML = "";
    fullNameErrorContainer.innerHTML = "";
    nickNameErrorContainer.innerHTML = "";

    const title = document.getElementById("fullName").value;
    const date = document.getElementById("date").value;
    const name = document.getElementById("nickName").value;

    if (!title) {
      displayError(fullNameErrorContainer, "Full Name is required");
    }
    if (!date) {
      displayError(dateErrorContainer, "Date is required");
    }
    if (!name) {
      displayError(nickNameErrorContainer, "Nickname is required");
    }

    // If there are no errors, proceed to create and add a new todo item
    if (
      !dateErrorContainer.hasChildNodes() &&
      !fullNameErrorContainer.hasChildNodes() &&
      !nickNameErrorContainer.hasChildNodes()
    ) {
      // Remove the "No todo available" message if it exists
      const noTodoMessageIcon = todoList.querySelector(".fa-ban");
      if (noTodoMessageIcon) {
        noTodoMessageIcon.remove();
      }

      const newTodoItem = createTodoItem(title, date, name);
      todoList.appendChild(newTodoItem);

      addTodoModal.hide();

      // Clear form fields
      document.getElementById("fullName").value = "";
      document.getElementById("date").value = "";
      document.getElementById("nickName").value = "";
    }
  });
  // End: Save Todo Button Event Listener

  // Start: Add Todo Button Event Listener
  const addTodoBtn = document.querySelector("#addTodoBtn");

  addTodoBtn.addEventListener("click", function () {
    // Start: Clear Error Message
    dateErrorContainer.innerHTML = "";
    fullNameErrorContainer.innerHTML = "";
    nickNameErrorContainer.innerHTML = "";
    // End: Clear Error Message

    addTodoModal.show();
  });
  // End: Add Todo Button Event Listener
});
