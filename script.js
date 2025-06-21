let tasks = [];

window.onload = () => {
  const saved = localStorage.getItem("tasks");
  if (saved) tasks = JSON.parse(saved);
  tasks.forEach(createTaskElement);
  updateCounters();
};

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounters() {
  document.getElementById("total-count").textContent = `Total: ${tasks.length}`;
  const completed = tasks.filter(t => t.completed).length;
  document.getElementById("completed-count").textContent = `Completed: ${completed}`;
}

function addTask() {
  const text = document.getElementById("todo-input").value.trim();
  const due = document.getElementById("due-date").value;
  const priority = document.getElementById("priority").value;

  if (!text) {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    text,
    due,
    priority,
    completed: false
  };

  tasks.push(task);
  createTaskElement(task);
  saveTasks();
  updateCounters();

  document.getElementById("todo-input").value = "";
  document.getElementById("due-date").value = "";
  document.getElementById("priority").value = "normal";
}

function createTaskElement(task) {
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  const info = document.createElement("div");
  info.className = "info";
  info.innerHTML = `<strong>${task.text}</strong><br>
    <span class="meta">📅 ${task.due || "No date"} | 🏷️ ${task.priority}</span>`;

  const actions = document.createElement("div");
  actions.className = "actions";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔️";
  completeBtn.onclick = () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    saveTasks();
    updateCounters();
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", task.text);
    if (newText) {
      task.text = newText;
      info.innerHTML = `<strong>${task.text}</strong><br>
        <span class="meta">📅 ${task.due || "No date"} | 🏷️ ${task.priority}</span>`;
      saveTasks();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = () => {
    tasks = tasks.filter(t => t.id !== task.id);
    li.remove();
    saveTasks();
    updateCounters();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(info);
  li.appendChild(actions);
  document.getElementById("todo-list").appendChild(li);
}

document.getElementById("mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const modeBtn = document.getElementById("mode-toggle");
  modeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
