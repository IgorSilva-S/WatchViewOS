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
        todoManager('add')
        closePopup()
    } 
    if (funcBtn == 'eventAdd') {
         let todoBox = document.createElement('div')
         let dateValue = document.getElementById('eventDate').value
         const [y, m, d] = dateValue.split("-");
        todoBox.innerHTML = `
            <div class="infoDiv">
                <span>${d}/${m}/${y}</span>
                <p>${document.getElementById('eventName').value}</p>
            </div>
        `
        let delBtn = document.createElement('button')
        delBtn.className = 'todoDelBtn'
        delBtn.innerHTML = '&#xe74d;'
        delBtn.addEventListener('click', () => {
            todoBox.remove()
        })
        let contDiv = document.createElement('div')
        contDiv.insertAdjacentElement('beforeend', delBtn)
        todoBox.insertAdjacentElement('beforeend', contDiv)
        todoBox.className = 'todoBox'

        document.getElementById('eventsContent').insertAdjacentElement('afterbegin', todoBox)
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
        document.getElementById('primBtn').style.display = 'none'
        popOpen = false
    }, 200);
}