const taskList = document.getElementById('taskList');
async function loadTasks() {
    const res = await fetch('https://your-backend-url/api/tasks');
    const tasks = await res.json();
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.textContent = task.text;
        const doneBtn = document.createElement('button');
        doneBtn.textContent = task.completed ? 'Done' : 'Mark Done';
        doneBtn.onclick = async () => {
            await fetch(`https://your-backend-url/api/tasks/${task._id}`, { method: 'PUT' });
            loadTasks();
        }; div.appendChild(doneBtn);
        taskList.appendChild(div);
    });
}
async function addTask() {
    const input = document.getElementById('taskInput');
    await fetch('https://your-backend-url/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input.value })
    });
    input.value = '';
    loadTasks();
}
async function askAI() {
    const input = document.getElementById('aiInput').value;
    const res = await fetch('https://your-backend-url/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();
    document.getElementById('aiResponse').textContent = data.reply;
} loadTasks();