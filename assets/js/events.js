const eventsVersion = '1.0'
document.getElementById('eventsVersion').innerHTML = eventsVersion

document.getElementById('createEvent').addEventListener('click', () => {
    document.getElementById('primBtn').removeAttribute('style')
    openPopup()
    funcBtn = 'eventAdd'
    document.getElementById('popContent').innerHTML = `
        <h1>Evento - Adicionar</h1>

        <label for="eventInfo">Nome do Evento</label>
        <input type="text" placeholder="Insira o nome aqui" id="eventInfo">
        <br>
        <label for="eventDate">Data do Evento</label>
        <input type="date" id="eventDate" name="eventdate">
        <br>
        <span>Lembre-se de adicionar nome e data, são campos obrigatórios</span>
    `
    document.getElementById('primBtn').innerText = 'Adicionar'
})

eventManager('check')

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
            if (fDate == e.date && !DND) {
                document.getElementById('eventName').innerText = e.name
                document.getElementById('eventbar').style.display = 'flex'
                document.getElementById('ePillName').innerText = e.name
                document.getElementById('eventPill').style.display = 'flex'
            }

            if (document.getElementById('hideEventPill').checked == true) {
                document.getElementById('eventPill').removeAttribute('style')
            }

            if (document.getElementById('removeEventBar').checked == true) {
                document.getElementById('eventbar').removeAttribute('style')
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