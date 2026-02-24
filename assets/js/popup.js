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
    closePopup()
})

document.getElementById('primBtn').addEventListener('click', () => {
    if (funcBtn == 'todoAdd') {
        todoManager('add')
        closePopup()
    }
    if (funcBtn == 'eventAdd') {
        eventManager('add')
    }
    if (funcBtn == 'alarmAdd') {
        alarmManager('add')
    } if (funcBtn == 'alarmEdit') {
        alarmManager('edit')
    } if (funcBtn == 'deleteAll') {
        document.getElementById('popContent').innerHTML = `
        <h1>Apagando todos os dados</h1>
        <br><br>
        Espere um instante. Assim que terminar, o site será reiniciado
    `
    document.getElementById('closePop').style.display = 'none'
    document.getElementById('primBtn').style.display = 'none'
    document.getElementById('dnc').style.transitionDuration = '.2s'
    document.getElementById('dnc').style.backgroundColor = '#000'
    localStorage.clear()
    setTimeout(() => {
        location.reload()
    }, 2000);
    }
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
        document.getElementById('primBtn').classList.remove('warning')
        popOpen = false
        funcBtn = null
    }, 200);
}