const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');
const emptyState = document.getElementById('empty-state');
const editModal = document.getElementById('edit-modal');
const editInput = document.getElementById('edit-input');
const saveEditBtn = document.getElementById('save-edit');
const cancelEditBtn = document.getElementById('cancel-edit');

let tasks = [];
let currentEditIndex = null;

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    totalTasks.textContent = `Total: ${total}`;
    completedTasks.textContent = `Completed: ${completed}`;
    pendingTasks.textContent = `Pending: ${pending}`;

    emptyState.style.display =total === 0 ? 'block' : 'none';
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
            <span class="task-desc">${task.description}</span>
            <button class="btn btn-edit" data-index="${index}">Edit</button>
            <button class="btn btn-delete" data-index="${index}">Delete</button>
        `;

        taskList.appendChild(li);
    });
    updateStats();
}

addBtn.addEventListener('click', () => {
    const description = taskInput.value.trim();
    if (description) {
        tasks.push({ description, completed: false });
        taskInput.value = '';
        renderTasks();
    }
});

taskList.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    if (e.target.classList.contains('task-checkbox')) {
        tasks[index].completed = e.target.checked;
        renderTasks();
    } else if (e.target.classList.contains('btn-edit')) {
        currentEditIndex = index;
        editInput.value = tasks[index].description;
        editModal.style.display = 'block';
    }
    else if (e.target.classList.contains('btn-delete')) {
        tasks.splice(index, 1);
        renderTasks();
    }
});

saveEditBtn.addEventListener('click', () => {
    const newDescription = editInput.value.trim();
    if (newDescription) {
        tasks[currentEditIndex].description = newDescription;
        editModal.style.display = 'none';
        renderTasks();
    }
});

cancelEditBtn.addEventListener('click', () => {    editModal.style.display = 'none';
});

renderTasks();