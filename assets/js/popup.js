let funcBtn = null

function openPopup() {
    document.getElementById('popUp').style.display = 'block'
    setTimeout(() => {
        document.getElementById('popUp').style.opacity = '1'
        document.getElementById('popUp').style.scale = '1'
        document.getElementById('dnc').style.display = 'block'
    }, 1);
}

document.getElementById('closePop').addEventListener('click', () => {
    document.getElementById('popUp').style.opacity = '0'
    document.getElementById('popUp').style.scale = '.9'
    setTimeout(() => {
        document.getElementById('popUp').removeAttribute('style')
    }, 200);
})

document.getElementById('primBtn').addEventListener('click', () => {
    if (funcBtn == 'todoAdd') {
        let todoBox = document.createElement('button')
        todoBox.innerText = document.getElementById('todoName').value
        todoBox.className = 'todoBox'
        todoBox.addEventListener('click', () => {
            if (removingTodo) {
                todoBox.remove()
                document.getElementById('removeTodo').click()
            } else {
                if (todoBox.classList.contains('todoChecked')) {
                    todoBox.classList.remove('todoChecked')
                } else {
                    todoBox.classList.add('todoChecked')
                }
            }
        })

        document.getElementById('todoContent').insertAdjacentElement('afterbegin', todoBox)
        closePopup()
    }
    funcBtn = null
})

document.getElementById('dnc').addEventListener('click', () => {
    closePopup()
})

function closePopup() {
    document.getElementById('popUp').style.opacity = '0'
    document.getElementById('popUp').style.scale = '.9'
    setTimeout(() => {
        document.getElementById('popUp').removeAttribute('style')
        document.getElementById('dnc').removeAttribute('style')
    }, 200);
}