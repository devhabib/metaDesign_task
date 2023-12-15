import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js";

document.addEventListener("DOMContentLoaded", function () {
  // Start: Bootstrap Modal Initialization
  const addTodoModal = new Modal(document.getElementById("addTodo"));
  // End: Bootstrap Modal Initialization

  const todoList = document.querySelector(".list-group");

  // Initial "No todo available" message
  const noTodoMessage = document.createElement("p");
  noTodoMessage.innerText = "No todo available";
  noTodoMessage.classList.add("text-center", "mt-3", "no-todo-message");
  todoList.appendChild(noTodoMessage);

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
    });
    // End: Mark as Done Button Event Listener

    // Start: Delete Todo Button Event Listener
    deleteTodoBtn.addEventListener("click", function () {
      listItem.remove();
      console.log("Delete clicked");

      // Check if there are no todo items and display the "No todo available" message
      if (todoList.children.length === 0) {
        const noTodoMessage = document.createElement("p");
        noTodoMessage.innerText = "No todo available";
        noTodoMessage.classList.add("text-center", "mt-3", "no-todo-message");
        todoList.appendChild(noTodoMessage);
      }
    });
    // End: Delete Todo Button Event Listener

    return listItem;
  }

  // Start: Save Todo Button Event Listener
  const saveTodoBtn = document.querySelector("#saveTodoBtn");

  saveTodoBtn.addEventListener("click", function () {
    const title = document.getElementById("fullName").value;
    const date = document.getElementById("date").value;
    const name = document.getElementById("nickName").value;

    if (title && date && name) {
      // Remove the "No todo available" message if it exists
      const noTodoMessage = todoList.querySelector(".no-todo-message");
      if (noTodoMessage) {
        noTodoMessage.remove();
      }

      const newTodoItem = createTodoItem(title, date, name);
      todoList.appendChild(newTodoItem);

      addTodoModal.hide();

      document.getElementById("fullName").value = "";
      document.getElementById("date").value = "";
      document.getElementById("nickName").value = "";
    } else {
      const errorContainer = document.getElementById("formError");
      errorContainer.innerText = "Please fill in all the fields.";
    }
  });
  // End: Save Todo Button Event Listener

  // Start: Add Todo Button Event Listener
  const addTodoBtn = document.querySelector("#addTodoBtn");

  addTodoBtn.addEventListener("click", function () {
    // Start: Clear Error Message
    const errorContainer = document.getElementById("formError");
    if (errorContainer) {
      errorContainer.innerText = ""; // Clear the error message when opening the modal
    }
    // End: Clear Error Message

    addTodoModal.show();
  });
  // End: Add Todo Button Event Listener
});
