let events, todos, alarms, personalization, settings, datas, homeMenuData, fBoot;

function bootData() {
    console.log(`Booting... \nGetting Data...`);


    events = JSON.parse(localStorage.getItem('events')) || [];
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    personalization = JSON.parse(localStorage.getItem('personalization')) || {};
    settings = JSON.parse(localStorage.getItem('settings')) || {};
    datas = JSON.parse(localStorage.getItem('datas')) || {};
    homeMenuData = JSON.parse(localStorage.getItem('homeMenu')) || {};
    fBoot = localStorage.getItem('initialBoot')

    // Salva os dados no localStorage se estiverem vazios
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('alarms', JSON.stringify(alarms));
    localStorage.setItem('personalization', JSON.stringify(personalization));
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('datas', JSON.stringify(datas));
    localStorage.setItem('homeMenu', JSON.stringify(homeMenuData));
    if (fBoot === null) {
        let d = new Date
        localStorage.setItem('initialBoot', d)
        fBoot = localStorage.getItem('initialBoot')
    }

    insertDay(fBoot)
    settingsAlign()
}

let editingAlarm = -1

function alarmManager(act) {

    if (act.toLowerCase() === 'add') {

        let name = document.getElementById('alarmName').value;
        let hour = document.getElementById('alarmHour').value;

        if (!name.trim() || !hour) return;

        let days = {
            dom: document.getElementById('aDom').checked,
            seg: document.getElementById('aSeg').checked,
            ter: document.getElementById('aTer').checked,
            qua: document.getElementById('aQua').checked,
            qui: document.getElementById('aQui').checked,
            sex: document.getElementById('aSex').checked,
            sáb: document.getElementById('aSab').checked
        };

        let alarm = {
            name,
            hour,
            enabled: true,
            days
        };

        alarms.push(alarm);
        localStorage.setItem('alarms', JSON.stringify(alarms));

        act = 'load';
        closePopup();
    }

    if (act.toLowerCase() === 'load') {

        let alarmContent = document.getElementById('alarmContent');
        alarmContent.innerHTML = '';

        alarms.forEach(alarm => {

            let alarmBox = document.createElement('div');
            alarmBox.className = 'todoBox';

            alarmBox.innerHTML = `
                <div class="alarmInfo">
                    <span class="alarmName">${alarm.name}</span>
                    <span class="alarmHour">${alarm.hour}</span>
                </div>
            `;

            let alarmExtra = document.createElement('div')
            alarmExtra.classList.add('alarmExtra')
            alarmExtra.innerHTML = `

            <div>
                <label class="switch">
                    <input type="checkbox" ${alarm.enabled ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>

            </div>`

            alarmBox.appendChild(alarmExtra)

            let editBtn = document.createElement('button')
            editBtn.className = 'todoDelBtn';
            editBtn.innerHTML = '&#xE70F;'
            editBtn.addEventListener('click', () => {
                editingAlarm = alarms.findIndex(a =>
                    a.name === alarm.name && a.hour === alarm.hour
                );
                openPopup();
                funcBtn = "alarmEdit";
                document.getElementById("popContent").innerHTML = `
                    <h1>Alarme - Editar</h1>

                    <label for="alarmName">Nome do Alarme</label>
                    <input type="text" placeholder="Insira o nome aqui" id="alarmName">
                     <br>
                    <label for="alarmHour">Hora do alarme</label>
                    <input type="time" id="alarmHour" name="alarmHour">
                    <br>
                    Dia da semana
                    <div class="lLine">
                     <div class="cCol">
                        <input type="checkbox" name="" id="aDom">
                        <label for="aDom">Dom</label>
                    </div>
                    <div class="cCol">
                        <input type="checkbox" name="" id="aSeg">
                        <label for="aSeg">Seg</label>
                    </div>
                    <div class="cCol">
                        <input type="checkbox" name="" id="aTer">
                        <label for="aTer">Ter</label>
                    </div>
                    <div class="cCol">
                        <input type="checkbox" name="" id="aQua">
                        <label for="aQua">Qua</label>
                    </div>
                    <div class="cCol">
                        <input type="checkbox" name="" id="aQui">
                        <label for="aQui">Qui</label>
                    </div>
                    <div class="cCol">
                        <input type="checkbox" name="" id="aSex">
                        <label for="aSex">Sex</label>
                    </div>
                    <div class="cCol">
                        <input type="checkbox" name="" id="aSab">
                        <label for="aSab">Sáb</label>
                    </div>
                </div>
    `;
                document.getElementById("primBtn").innerText = "Editar";

                document.getElementById('alarmName').value = alarm.name
                document.getElementById('alarmHour').value = alarm.hour
                document.getElementById('aDom').checked = alarm.days.dom
                document.getElementById('aSeg').checked = alarm.days.seg
                document.getElementById('aTer').checked = alarm.days.ter
                document.getElementById('aQua').checked = alarm.days.qua
                document.getElementById('aQui').checked = alarm.days.qui
                document.getElementById('aSex').checked = alarm.days.sex
                document.getElementById('aSab').checked = alarm.days.sáb
                console.log(editingAlarm)
                document.getElementById('primBtn').removeAttribute('style')

            })

            let delBtn = document.createElement('button');
            delBtn.className = 'todoDelBtn';
            delBtn.innerHTML = '&#xe74d;';
            delBtn.addEventListener('click', () => {
                alarmBox.remove();
                alarms = alarms.filter(a =>
                    !(a.name === alarm.name && a.hour === alarm.hour)
                );
                localStorage.setItem('alarms', JSON.stringify(alarms));
            });



            let switchInput = alarmBox.querySelector('.switch input');

            switchInput.addEventListener('change', () => {
                let index = alarms.findIndex(a =>
                    a.name === alarm.name && a.hour === alarm.hour
                );

                if (index !== -1) {
                    alarms[index].enabled = switchInput.checked;
                    localStorage.setItem('alarms', JSON.stringify(alarms));
                }
            });

            alarmExtra.appendChild(editBtn)
            alarmExtra.appendChild(delBtn);
            alarmContent.prepend(alarmBox);
        });
    }

    if (act.toLowerCase() === 'edit') {
        if (editingAlarm !== -1) {
            alarms[editingAlarm].name = document.getElementById('alarmName').value
            if (document.getElementById('alarmName').value.trim() == '') {
                return;
            }
            alarms[editingAlarm].hour = document.getElementById('alarmHour').value
            if (document.getElementById('alarmHour').value.trim() == '') {
                return;
            }
            alarms[editingAlarm].days = {
                dom: document.getElementById('aDom').checked,
                seg: document.getElementById('aSeg').checked,
                ter: document.getElementById('aTer').checked,
                qua: document.getElementById('aQua').checked,
                qui: document.getElementById('aQui').checked,
                sex: document.getElementById('aSex').checked,
                sáb: document.getElementById('aSab').checked
            }

            localStorage.setItem('alarms', JSON.stringify(alarms));

            alarmManager('load')
            editingAlarm = -1
            closePopup()
        }
    }

    if (act.toLowerCase() === 'format') {
        alarms = [];
        localStorage.setItem('alarms', []);
        document.getElementById('alarmContent').innerHTML = '';
    }
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
        todos = [];
        localStorage.setItem('todos', '[]');
        document.getElementById('todoContent').innerHTML = '';
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
        document.getElementById('eventPill').removeAttribute('style')
        events.forEach((e) => {
            let AZ = (n) => {
                return ('0' + n).slice(-2)
            }
            let d = new Date()
            let fDate = `${d.getFullYear()}-${AZ(d.getMonth() + 1)}-${AZ(d.getDate())}`
            if (fDate == e.date) {
                document.getElementById('eventName').innerText = e.name
                document.getElementById('eventbar').style.display = 'flex'
                document.getElementById('ePillName').innerText = e.name
                document.getElementById('eventPill').style.display = 'flex'
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
        events = []
        localStorage.setItem('events', '[]')
        document.getElementById('eventsContent').innerHTML = ''
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