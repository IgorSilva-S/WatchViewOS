let events, todos, alarms, personalization, settings, datas;

function bootData() {
    console.log(`Booting... \nGetting Data...`);

    events = JSON.parse(localStorage.getItem('events')) || [];
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    personalization = JSON.parse(localStorage.getItem('personalization')) || [];
    settings = JSON.parse(localStorage.getItem('settings')) || [];
    datas = JSON.parse(localStorage.getItem('datas')) || [];

    // Salva os dados no localStorage se estiverem vazios
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('alarms', JSON.stringify(alarms));
    localStorage.setItem('personalization', JSON.stringify(personalization));
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('datas', JSON.stringify(datas));
}

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
    }

    if (act.toLowerCase() === 'load') {
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

    }
}

function eventManager(act, name) {
    console.log(name)
    if (act == 'add') {
         let todoBox = document.createElement('div')
         let dateValue = document.getElementById('eventDate').value
         let eventName = name
         const [y, m, d] = dateValue.split("-");
        todoBox.innerHTML = `
            <div class="infoDiv">
                <span>${d}/${m}/${y}</span>
                <p>${eventName}</p>
            </div>
        `
        let delBtn = document.createElement('button')
        delBtn.className = 'todoDelBtn'
        delBtn.innerHTML = '&#xe74d;'
        delBtn.addEventListener('click', () => {
            todoBox.remove()
        })
        let contDiv = document.createElement('div')
        contDiv.insertAdjacentElement('beforeend', delBtn)
        todoBox.insertAdjacentElement('beforeend', contDiv)
        todoBox.className = 'todoBox'
        let event = {
            name: eventName,
            date: dateValue
        }

        events.push(event)
        localStorage.setItem('events', JSON.stringify(events))

        document.getElementById('eventsContent').insertAdjacentElement('afterbegin', todoBox)
    }
}