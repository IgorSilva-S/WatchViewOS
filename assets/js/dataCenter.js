let events, todos, alarms, personalization, settings, datas, fBoot;

function bootData() {
    console.log(`Booting... \nGetting Data...`);


    events = JSON.parse(localStorage.getItem('events')) || [];
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    personalization = JSON.parse(localStorage.getItem('personalization')) || [];
    settings = JSON.parse(localStorage.getItem('settings')) || {};
    datas = JSON.parse(localStorage.getItem('datas')) || [];
    fBoot = localStorage.getItem('initialBoot')

    // Salva os dados no localStorage se estiverem vazios
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('alarms', JSON.stringify(alarms));
    localStorage.setItem('personalization', JSON.stringify(personalization));
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('datas', JSON.stringify(datas));
    if (fBoot === null) {
        let d = new Date
        localStorage.setItem('initialBoot', d)
        fBoot = localStorage.getItem('initialBoot')
    }

    insertDay(fBoot)
    settingsAlign()
}

function alarmManager(act) {

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
        localStorage.removeItem('todos')
    } else {
        console.log('Todo Manager: Não há essa função para o Todo Manager')
    }
}

function eventManager(act, date) {
    if (act.toLowerCase() == 'add') {
        let todoBox = document.createElement('div')
        let dateValue = document.getElementById('eventDate').value
        let eventName = document.getElementById('eventInfo').value
        if (dateValue === '' || eventName.trim() === '') {
            return
        }
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
            events = events.filter(t => t.name !== eventName);
            localStorage.setItem('events', JSON.stringify(events));
            events = JSON.parse(localStorage.getItem('events'))
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
        closePopup()

        document.getElementById('eventsContent').insertAdjacentElement('afterbegin', todoBox)
    } else if (act.toLowerCase() == 'check') {
        document.getElementById('eventbar').removeAttribute('style')
        events.forEach((e) => {
            let AZ = (n) => {
                return ('0' + n).slice(-2)
            }
            let d = new Date()
            let fDate = `${d.getFullYear()}-${AZ(d.getMonth() + 1)}-${AZ(d.getDate())}`
            if (fDate == e.date) {
                document.getElementById('eventName').innerText = e.name
                document.getElementById('eventbar').style.display = 'flex'
            }
        })
    } else if (act.toLowerCase() == 'load') {
        events.forEach((e) => {
            let todoBox = document.createElement('div')
            let dateValue = e.date
            let eventName = e.name
            if (dateValue === '' || eventName.trim() === '') {
                return
            }
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
                events = events.filter(t => t.name !== eventName);
                localStorage.setItem('events', JSON.stringify(events));
                events = JSON.parse(localStorage.getItem('events'))
            })
            let contDiv = document.createElement('div')
            contDiv.insertAdjacentElement('beforeend', delBtn)
            todoBox.insertAdjacentElement('beforeend', contDiv)
            todoBox.className = 'todoBox'

            document.getElementById('eventsContent').insertAdjacentElement('afterbegin', todoBox)
        })
    } else if (act.toLowerCase() == 'format') {
        localStorage.removeItem('events')
    } else {
        console.log('Event Manager: Não há essa função para o Event Manager')
    }
}

function insertDay(date) {
    let d = new Date(date)
    let AZ = (n) => {
        return ('0' + n).slice(-2)
    }
    document.getElementById('fdUse').innerText = `${AZ(d.getDate())}/${AZ(d.getMonth() + 1)}/${d.getFullYear()}`
}

function settingsAlign() {
    if (settings.lite == true) {
        document.getElementById('liteModel').checked = true
        document.getElementById('mainCss').href = 'assets/css/lite.css'
    }

    if (settings.noSound == true) {
        document.getElementById("sysSounds").checked = false
    }

    if (settings.noFS == true) {
        document.getElementById("dblclkFS").checked = false
    }
}