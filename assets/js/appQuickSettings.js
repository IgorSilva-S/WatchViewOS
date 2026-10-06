let appQuickSettings = false
let isPointerInHeader = false
let isDragging = false
let appInLeft = null
let appInRight = null
let openSecondAppIn = null
let headerPointerY = 0;
const quickSettingsPanel = document.getElementById('qsp')

document.addEventListener('click', () => {
    if (isDragging) {
        isDragging = false
    }

    if (actualApp == null) {
        watchApp.removeAttribute('style')
        actualApp = 'watch'

        // document.dispatchEvent(new Event('contextmenu'))
    }
})

function openQuickSettings() {
    const appName = quickSettingsPanel.querySelector(':scope > div > h1');
    watchApp.classList.add('appSettings');
    alarmApp.classList.add('appSettings');
    todoApp.classList.add('appSettings');
    eventsApp.classList.add('appSettings');
    settingsApp.classList.add('appSettings');
    lateralApp.classList.add('appSettings')
    switch (actualApp) {
        case 'watch':
            appName.innerText = 'Relógio';
            break;
        case 'alarm':
            appName.innerText = 'Alarmes';
            break;
        case 'todo':
            appName.innerText = 'Afazeres';
            break;
        case 'events':
            appName.innerText = 'Eventos';
            break;
        case 'settings':
            appName.innerText = 'Configurações';
            break;
    }
    appQuickSettings = true
    isPointerInHeader = false
    isDragging = true
    quickSettingsPanel.style.bottom = '0'
    document.getElementById('openQS').currentTime = 0
    document.getElementById('openQS').play()
    wallpaper.style.filter = 'brightness(50%)'
}

function closeQuickSettings(needSilence) {
    watchApp.classList.remove('appSettings');
    alarmApp.classList.remove('appSettings');
    todoApp.classList.remove('appSettings');
    eventsApp.classList.remove('appSettings');
    settingsApp.classList.remove('appSettings');
    lateralApp.classList.remove('appSettings')
    appQuickSettings = false
    quickSettingsPanel.removeAttribute('style')
    if (!needSilence) {
        document.getElementById('closeQS').currentTime = 0
        document.getElementById('closeQS').play()
    }
    wallpaper.removeAttribute('style')
}

document.querySelectorAll('.appHeader').forEach((h) => {
    h.addEventListener('pointerdown', (e) => {
        isPointerInHeader = true
        headerPointerY = e.clientY;
    })

    h.addEventListener('pointermove', (e) => {
        if (!isPointerInHeader) return;
        const posi = e.clientY - headerPointerY;

        if (posi >= 20) {
            openQuickSettings()
        }
    })

    h.addEventListener('pointerup', () => {
        isPointerInHeader = false
        isDragging = false
        headerPointerY = 0
    })
})

window.addEventListener('pointerup', () => {
    isPointerInHeader = false
    headerPointerY = 0
})

watchApp.addEventListener('click', () => {
    if (isDragging) {
        isDragging = false;
        return;
    }

    if (appQuickSettings) {
        closeQuickSettings()
    }
})

document.querySelectorAll('.app').forEach(a => {
    console.log(a)
    a.addEventListener('click', () => {
        console.log(a.id)
        if (isDragging) {
            isDragging = false;
            return;
        }

        if (appQuickSettings) {
            closeQuickSettings()
        }
    })
})

document.getElementById('posiAppLeft').addEventListener('click', () => {
    closeQuickSettings()
    if (appList[actualApp].classList.contains('divideInTwo_L')) {
        appList[actualApp].classList.remove('divideInTwo_L')
        lateralApp.classList.remove('divideInTwo_R')
        lateralApp.classList.remove('divideInTwo_L')
        appInLeft = null
        appInRight = null
        openSecondAppIn = null
    } else {
        appList[actualApp].classList.remove('divideInTwo_L')
        appList[actualApp].classList.remove('divideInTwo_R')
        appList[actualApp].classList.add('divideInTwo_L')
        if (appInRight == null) {
            lateralApp.classList.add('divideInTwo_R');
            appInRight = 'lateral'
            openSecondAppIn = 'right'
        } else {
            appInRight = appInLeft
            openSecondAppIn = 'right'
            appList[appInRight].classList.remove('divideInTwo_L')
            appList[appInRight].classList.add('divideInTwo_R')
        }
        appInLeft = actualApp
    }
})

document.getElementById('closeApp').addEventListener('click', () => {
    appList[actualApp].style.opacity = '0'
    lateralApp.style.opacity = '0'
    setTimeout(() => {
        if (actualApp == 'watch') {
            appList[actualApp].style.display = 'none'
        } else {
            appList[actualApp].removeAttribute('style')
        }
        appList[actualApp].classList.remove('divideInTwo_R')
        appList[actualApp].classList.remove('divideInTwo_L')
        lateralApp.classList.remove('divideInTwo_R')
        lateralApp.classList.remove('divideInTwo_L')
        lateralApp.removeAttribute('style')
        actualApp = null
        closeQuickSettings(true)
    }, 700);
})

document.getElementById('posiAppRight').addEventListener('click', () => {
    closeQuickSettings()
    if (appList[actualApp].classList.contains('divideInTwo_R')) {
        appList[actualApp].classList.remove('divideInTwo_R')
        lateralApp.classList.remove('divideInTwo_R')
        lateralApp.classList.remove('divideInTwo_L')
        appInRight = null
        appInLeft = null
        openSecondAppIn = null
    } else {
        appList[actualApp].classList.remove('divideInTwo_L')
        appList[actualApp].classList.remove('divideInTwo_R')
        appList[actualApp].classList.add('divideInTwo_R')
        if (appInLeft == null) {
            lateralApp.classList.add('divideInTwo_L');
            appInLeft = 'lateral'
            openSecondAppIn = 'left'
        } else {
            appInLeft = appInRight
            openSecondAppIn = 'left'
            appList[appInLeft].classList.remove('divideInTwo_R')
            appList[appInLeft].classList.add('divideInTwo_L')
        }
        appInRight = actualApp
    }
})