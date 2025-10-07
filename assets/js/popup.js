let funcBtn = null
let popOpen = false

function openPopup() {
    document.getElementById('popUp').style.display = 'block'
    setTimeout(() => {
        document.getElementById('popUp').style.opacity = '1'
        document.getElementById('popUp').style.scale = '1'
        document.getElementById('dnc').style.display = 'block'
        popOpen = true
    }, 1);
}

document.getElementById('closePop').addEventListener('click', () => {
    document.getElementById('popUp').style.opacity = '0'
    document.getElementById('popUp').style.scale = '.9'
    setTimeout(() => {
        document.getElementById('popUp').removeAttribute('style')
        document.getElementById('dnc').removeAttribute('style')
        document.getElementById('primBtn').style.display = 'none'
        popOpen = false
    }, 200);
})

document.getElementById('primBtn').addEventListener('click', () => {
    if (funcBtn == 'todoAdd') {
        let todoBox = document.createElement('div')
        todoBox.innerHTML = `
            <p>${document.getElementById('todoName').value}</p>
        `
        let delBtn = document.createElement('button')
        delBtn.className = 'todoDelBtn'
        delBtn.innerHTML = '&#xe74d;'
        delBtn.addEventListener('click', () => {
            todoBox.remove()
        })
        let makeTodo = document.createElement('input')
        makeTodo.type = 'checkbox'
        makeTodo.addEventListener('change', () => {
            if (todoBox.classList.contains('todoChecked')) {
                todoBox.classList.remove('todoChecked')
            } else {
                todoBox.classList.add('todoChecked')
            }
        })
        let contDiv = document.createElement('div')
        contDiv.insertAdjacentElement('beforeend', delBtn)
        contDiv.insertAdjacentElement('beforeend', makeTodo)
        todoBox.insertAdjacentElement('beforeend', contDiv)
        todoBox.className = 'todoBox'

        document.getElementById('todoContent').insertAdjacentElement('afterbegin', todoBox)
        closePopup()
    }
    funcBtn = null
    popOpen = false
})

document.getElementById('dnc').addEventListener('click', () => {
    closePopup()
    popOpen = false
})

function closePopup() {
    document.getElementById('popUp').style.opacity = '0'
    document.getElementById('popUp').style.scale = '.9'
    setTimeout(() => {
        document.getElementById('popUp').removeAttribute('style')
        document.getElementById('dnc').removeAttribute('style')
    }, 200);
}