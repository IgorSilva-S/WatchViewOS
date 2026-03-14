const todoVersion = '1.0'
document.getElementById('todoVersion').innerHTML = todoVersion

document.getElementById('addTodo').addEventListener('click', () => {
    document.getElementById('primBtn').removeAttribute('style')
    openPopup()
    funcBtn = 'todoAdd'
    document.getElementById('popContent').innerHTML = `
        <h1>Afazer - Adicionar</h1>

        <label for="todoName">Nome do Afazer</label>
        <input type="text" placeholder="Insira o nome aqui" id="todoName">
    `
    document.getElementById('primBtn').innerText = 'Adicionar'
})

function todoManager(act) {
    if (act.toLowerCase() === 'add') {
        let todoName = document.getElementById('todoName').value;
        if (!todoName.trim()) return;

        // Cria visualmente o todo
        let todoBox = document.createElement('div');
        todoBox.className = 'todoBox';
        todoBox.innerHTML = `<p>${todoName}</p>`;
        let checked = false

        let delBtn = document.createElement('button');
        delBtn.className = 'todoDelBtn';
        delBtn.innerHTML = '&#xe74d;';
        delBtn.addEventListener('click', () => {
            todoBox.remove();
            todos = todos.filter(t => t.name !== todoName);
            localStorage.setItem('todos', JSON.stringify(todos));
        });

        let makeTodo = document.createElement('input');
        makeTodo.type = 'checkbox';
        makeTodo.addEventListener('change', () => {
            todoBox.classList.toggle('todoChecked');
            makeTodo.checked ? checked = true : checked = false
            let index = todos.findIndex(t => t.name === todoName);
            if (index !== -1) {
                todos[index].checked = makeTodo.checked;
                localStorage.setItem('todos', JSON.stringify(todos));
            }
            if (document.getElementById('delFinishedTodo').checked == true) {
                todoBox.remove();
                todos = todos.filter(t => t.name !== todoName);
                localStorage.setItem('todos', JSON.stringify(todos));
            }
        });

        let contDiv = document.createElement('div');
        contDiv.appendChild(delBtn);
        contDiv.appendChild(makeTodo);
        todoBox.appendChild(contDiv);

        document.getElementById('todoContent').prepend(todoBox);
        closePopup();

        // Salva no localStorage
        todos.push({ name: todoName, checked: checked });
        localStorage.setItem('todos', JSON.stringify(todos));
    } else if (act.toLowerCase() === 'load') {
        todos.forEach(todo => {
            let todoBox = document.createElement('div');
            todoBox.className = 'todoBox';
            if (todo.checked) todoBox.classList.add('todoChecked');
            todoBox.innerHTML = `<p>${todo.name}</p>`;

            let delBtn = document.createElement('button');
            delBtn.className = 'todoDelBtn';
            delBtn.innerHTML = '&#xe74d;';
            delBtn.addEventListener('click', () => {
                todoBox.remove();
                todos = todos.filter(t => t.name !== todo.name);
                localStorage.setItem('todos', JSON.stringify(todos));
            });

            let makeTodo = document.createElement('input');
            makeTodo.type = 'checkbox';
            makeTodo.checked = todo.checked;
            makeTodo.addEventListener('change', () => {
                todoBox.classList.toggle('todoChecked');
                let index = todos.findIndex(t => t.name === todo.name);
                if (index !== -1) {
                    todos[index].checked = makeTodo.checked;
                    localStorage.setItem('todos', JSON.stringify(todos));
                }
            });

            let contDiv = document.createElement('div');
            contDiv.appendChild(delBtn);
            contDiv.appendChild(makeTodo);
            todoBox.appendChild(contDiv);

            document.getElementById('todoContent').prepend(todoBox);
        });

    } else if (act.toLowerCase() == 'format') {
        todos = [];
        localStorage.setItem('todos', '[]');
        document.getElementById('todoContent').innerHTML = '';
    } else {
        console.log('Todo Manager: Não há essa função para o Todo Manager')
    }
}