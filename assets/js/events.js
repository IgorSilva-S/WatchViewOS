
document.getElementById('createEvent').addEventListener('click', () => {
    console.log(events)
    document.getElementById('primBtn').removeAttribute('style')
    openPopup()
    funcBtn = 'eventAdd'
    document.getElementById('popContent').innerHTML = `
        <h1>Evento - Adicionar</h1>

        <label for="eventName">Nome do Evento</label>
        <input type="text" placeholder="Insira o nome aqui" id="eventName">
        <br>
        <label for="eventDate">Data do Evento</label>
        <input type="date" id="eventDate" name="eventdate">
    `
    document.getElementById('primBtn').innerText = 'Adicionar'
})