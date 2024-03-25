document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');

    const editButton = document.getElementById('updateItem');
    const addButton = document.getElementById('addItem');
    const todoList = document.getElementById('todo-list');
    let selectedIndex = null;


    function addItem(name) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.push({ name });
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
    }
    
    function removeItem(index) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
    }
    
    function editItem(index, newName) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items[index].name = newName;
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
    }
    
    function renderItems() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        todoList.innerHTML = '';
        items.forEach((item, index) => {

            const action = document.createElement('div');
            action.className = "actions";

            const li = document.createElement('li');
            li.textContent = item.name;
            const editButton = document.createElement('button');
            editButton.className = "editButton";
            editButton.textContent = 'Editar';
            editButton.onclick = () => setEditTask(index, item.name);
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.className = "removeButton";
            removeButton.addEventListener('click', () => removeItem(index));
            action.appendChild(editButton);
            action.appendChild(removeButton);

            li.append(action);
            todoList.appendChild(li);
        });
    }

    function setEditTask(index, value) {
        const taskInput = document.getElementById('todo-input');
        taskInput.value = value;
        selectedIndex = index;
    }


    function updateItem() {
        const taskInput = document.getElementById('todo-input');
        const newTask = taskInput.value;
        const items = JSON.parse(localStorage.getItem('items')) || [];
        
        if (newTask && selectedIndex !== null) {
            items[selectedIndex].name = newTask;
            localStorage.setItem('items', JSON.stringify(items));
            selectedIndex = null;
            taskInput.value = '';
            renderItems();
        }
    }
    
    addButton.addEventListener('click', function(event) {
        event.preventDefault();
        const itemNameInput = document.getElementById('todo-input');
        const itemName = itemNameInput.value.trim();
        if (itemName !== '') {
            addItem(itemName);
            itemNameInput.value = '';
        } else {
            alert('Por favor, insira um nome para o item.');
        }
    });
    
    editButton.addEventListener('click', function(event) {
        event.preventDefault();
        const itemNameInput = document.getElementById('todo-input');
        const itemName = itemNameInput.value.trim();
        if (itemName !== '') {
            updateItem();
            itemNameInput.value = '';
        } else {
            alert('Por favor, insira um nome para o item.');
        }
    });

    renderItems();
});