let removingTodo = false

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

document.getElementById('removeTodo').addEventListener('click', () => {
    let allTodo = [...document.getElementsByClassName('todoBox')]
    if (removingTodo) {
        document.getElementById('todoMode').innerHTML = 'Modo marcação'
        removingTodo = false
        allTodo.forEach((t) => {
            t.classList.remove('todoRemove')
        })
    } else {
        document.getElementById('todoMode').innerHTML = 'Modo remoção'
        removingTodo = true
        allTodo.forEach((t) => {
            t.classList.add('todoRemove')
        })
    }
})