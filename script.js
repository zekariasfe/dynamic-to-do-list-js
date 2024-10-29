document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Initialize the tasks array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks from the tasks array
    function loadTasks() {
        // Clear existing tasks in the DOM
        taskList.innerHTML = '';
        
        // Loop through tasks array and add each task to the DOM
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Function to create a task element and add it to the DOM
    function createTaskElement(taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.classList.add('task-item');

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Set up remove button to delete the task item
        removeButton.onclick = function() {
            removeTask(taskText);
        };

        // Append the remove button to the task item, and the task item to the list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);
    }

    // Add Task function to add a task to the list and save it in Local Storage
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Add task to tasks array and Local Storage
        tasks.push(taskText);
        saveTasks();

        // Add task to the DOM
        createTaskElement(taskText);

        // Clear the task input field
        taskInput.value = "";
    }

    // Remove Task function to remove a task from the list and Local Storage
    function removeTask(taskText) {
        // Filter out the task to be removed
        tasks = tasks.filter(task => task !== taskText);
        saveTasks();  // Update Local Storage

        // Re-render the updated task list
        renderTasks();
    }

    // Save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load and render tasks on page load
    loadTasks();

    // Attach Event Listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
