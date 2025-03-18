
let slideInterval;
const tabButtons = document.querySelectorAll('.tab-btn');

tabButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons and panes
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });
    
    // Add active class to current button and corresponding pane
    this.classList.add('active');
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const thumbs = document.querySelectorAll('.thumb');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

function showSlide(index) {
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    thumbs[currentSlide].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    resetTimer();
});

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    resetTimer();
});

thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-index'));
        showSlide(slideIndex);
        resetTimer();
    });
});

function startSlideTimer() {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 3000);
}

function resetTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
}

startSlideTimer();

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
