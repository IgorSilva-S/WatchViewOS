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
    } else if (funcBtn == 'eventAdd') {
        eventManager('add')
    } else if (funcBtn == 'alarmAdd') {
        alarmManager('add')
    } else if (funcBtn == 'alarmEdit') {
        alarmManager('edit')
    } else if (funcBtn == 'deleteAll') {
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
    } else if (funcBtn == 'deleteSpecific') {
        let checkers = document.querySelectorAll('#popContent input[type="checkbox"]')
        let delObj = {
            'events': checkers[0].checked,
            'todos': checkers[1].checked,
            'alarms': checkers[2].checked,
            'personalization': checkers[3].checked,
            'settings': checkers[4].checked,
            'datas': checkers[5].checked,
            'homeMenu': checkers[6].checked
        }

        Object.entries(delObj).forEach(([key, value]) => {
            if (value == true) {
                localStorage.removeItem(key)
            }
        });
        document.getElementById('popContent').innerHTML = `
        <h1>Apagando dados selecionados</h1>
        <br><br>
        Espere um instante. Assim que terminar, você poderá reiniciar o sistema pelo botão
    `
        document.getElementById('closePop').style.display = 'none'
        document.getElementById('primBtn').style.display = 'none'
        document.getElementById('dnc').style.transitionDuration = '.2s'
        document.getElementById('dnc').style.backgroundColor = '#000'
        setTimeout(() => {
            document.getElementById('primBtn').removeAttribute('style')
            document.getElementById('primBtn').classList.remove('warning')
            document.getElementById('primBtn').innerText = 'Reiniciar'
            funcBtn = 'reset'
        }, 2000);
    } else if (funcBtn == 'reset') {
        location.reload()
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