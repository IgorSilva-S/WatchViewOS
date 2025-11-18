
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

eventManager('load')
eventManager('check')