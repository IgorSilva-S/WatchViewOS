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
