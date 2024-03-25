document.addEventListener('DOMContentLoaded', function() {

    const editButton = document.getElementById('updateItem');
    const addButton = document.getElementById('addItem');
    const todoList = document.getElementById('todo-list');
    let selectedIndex = null;

    //função de adicionar itens
    function addItem(name) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.push({ name });
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
    }
    
    //função de remover itens
    function removeItem(index) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
    }

    //função de editar itens
    function editItem(index, newName) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items[index].name = newName;
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
    }
    
    //função de renderizar itens
    function renderItems() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        todoList.innerHTML = '';
        items.forEach((item, index) => {

            //criando a div de ações
            const action = document.createElement('div');
            action.className = "actions";

            //criando os elementos da lista
            const li = document.createElement('li');
            li.textContent = item.name;

            //criando elemento de editar
            const editButton = document.createElement('button');
            editButton.className = "editButton";
            editButton.textContent = 'Editar';
            editButton.onclick = () => setEditTask(index, item.name);
            
            //criando elemento de remover
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.className = "removeButton";
            removeButton.addEventListener('click', () => removeItem(index));

            //adicionando botoes a div de ações
            action.appendChild(editButton);
            action.appendChild(removeButton);

            //adicioando a div de ações no elemento
            li.append(action);
            todoList.appendChild(li);
        });
    }

    //preenchendo o input com o valor do item que vai ser editado
    function setEditTask(index, value) {
        const taskInput = document.getElementById('todo-input');
        taskInput.value = value;
        selectedIndex = index;
    }

    //atualizando valor do item
    function updateItem() {
        const taskInput = document.getElementById('todo-input');
        const newTask = taskInput.value;
        const items = JSON.parse(localStorage.getItem('items')) || [];
        debugger
        if(selectedIndex === null){
            alert('Por favor, selecione um item para editar');
        }else{
            if (newTask && selectedIndex !== null) {
                items[selectedIndex].name = newTask;
                localStorage.setItem('items', JSON.stringify(items));
                selectedIndex = null;
                taskInput.value = '';
                renderItems();
            }
        }
    }
    

    //chamada do evento de adicionar
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
    

    //chamada do evento de editar
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