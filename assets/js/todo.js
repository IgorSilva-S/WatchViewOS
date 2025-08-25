let removingTodo = false

document.getElementById('addTodo').addEventListener('click', () => {
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
        removingTodo = false
        allTodo.forEach((t) => {
            t.classList.remove('todoRemove')
        })
    } else {
        removingTodo = true
        allTodo.forEach((t) => {
            t.classList.add('todoRemove')
        })
    }
})