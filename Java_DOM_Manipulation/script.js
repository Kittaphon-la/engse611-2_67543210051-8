document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const todoList = document.getElementById("todoList");
    const clearCompletedBtn = document.getElementById("clearCompleted");
    const clearAllBtn = document.getElementById("clearAll");

    let todos = [];

    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.classList.toggle("completed", todo.completed);

            li.innerHTML = `
                <span>${todo.text}</span>
                <div class="task-actions">
                    <button class="toggle" data-index="${index}">
                        ${todo.completed ? "↩️" : "✓"}
                    </button>
                    <button class="delete" data-index="${index}">🗑️</button>
                </div>
            `;

            todoList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text !== "") {
            todos.push({ text, completed: false });
            taskInput.value = "";
            renderTodos();
        }
    }

    function toggleTask(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    function deleteTask(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    function clearCompletedTasks() {
        todos = todos.filter(todo => !todo.completed);
        renderTodos();
    }

    function clearAllTasks() {
        todos = [];
        renderTodos();
    }

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("toggle")) {
            toggleTask(e.target.dataset.index);
        } else if (e.target.classList.contains("delete")) {
            deleteTask(e.target.dataset.index);
        }
    });

    clearCompletedBtn.addEventListener("click", clearCompletedTasks);
    clearAllBtn.addEventListener("click", clearAllTasks);
});
