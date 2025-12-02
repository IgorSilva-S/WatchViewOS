let homeMenuOpened = false
const homeMenu = document.getElementById('HM')
const hmClose = document.getElementById('hmClose')
const wallpaper = document.getElementById('wallpaper')

document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    let canPlaySFX = document.getElementById('sysSounds').checked
    let isLowEffects = document.getElementById('liteModel').checked
    let isMobile = window.matchMedia("(max-height: 500px)").matches ? true : false
    let phoneUp = window.matchMedia("(max-width: 500px)").matches ? true : false
    eventManager('check')
    if (!homeMenuOpened && !phoneUp && !popOpen && connected) {
        homeMenu.style.bottom = '0'
        hmClose.style.bottom = '0'
        if (actualApp == 'watch') {
            if (!isMobile) {
                document.getElementById('watch').style.height = '40vh'
            } else {
                document.getElementById('watch').style.height = '50vh'
            }

            document.getElementById('watch').style.flexDirection = 'row'
            document.getElementById('watch').style.justifyContent = 'space-evenly'
        }
        if (canPlaySFX) {
            document.getElementById('closeHome').pause()
            document.getElementById('closeHome').currentTime = 0
            document.getElementById('openHome').pause()
            document.getElementById('openHome').currentTime = 0
            document.getElementById('openHome').play()
        }
        if (actualApp == 'watch') {
            wallpaper.style.filter = 'brightness(50%)'
        }
        homeMenuOpened = true
        document.getElementById('eventbar').removeAttribute('style')
        lSound()
    } else if (!phoneUp && !popOpen && connected) {
        homeMenu.removeAttribute('style')
        hmClose.removeAttribute('style')
        if (canPlaySFX) {
            document.getElementById('closeHome').pause()
            document.getElementById('closeHome').currentTime = 0
            document.getElementById('openHome').pause()
            document.getElementById('openHome').currentTime = 0
            document.getElementById('closeHome').play()
        }
        if (actualApp == 'watch') {
            document.getElementById('watch').removeAttribute('style')
        }
        wallpaper.removeAttribute('style')
        homeMenuOpened = false
        lSound()
    }
})

Array.from(document.getElementById('abc').children).forEach(element => {
    element.addEventListener('click', () => {
        homeMenu.removeAttribute('style')
        hmClose.removeAttribute('style')
        if (actualApp == 'watch') {
            document.getElementById('watch').removeAttribute('style')
        }
        wallpaper.removeAttribute('style')
        homeMenuOpened = false
    })
});

hmClose.addEventListener('click', () => {
    let canPlaySFX = document.getElementById('sysSounds').checked
    homeMenu.removeAttribute('style')
    hmClose.removeAttribute('style')
    if (canPlaySFX) {
        document.getElementById('closeHome').pause()
        document.getElementById('closeHome').currentTime = 0
        document.getElementById('openHome').pause()
        document.getElementById('openHome').currentTime = 0
        document.getElementById('closeHome').play()
    }
    if (actualApp == 'watch') {
        document.getElementById('watch').removeAttribute('style')
    }
    wallpaper.removeAttribute('style')
    homeMenuOpened = false

    lSound()
})

// Nav
// Apps
let actualApp = 'watch'
const watchApp = document.getElementById('watch')
const alarmApp = document.getElementById('alarm')
const todoApp = document.getElementById('todo')
const eventsApp = document.getElementById('events')
const settingsApp = document.getElementById('settings')

// Buttons
const watchBtn = document.getElementById('watchBtn')
const alarmBtn = document.getElementById('alarmBtn')
const todoBtn = document.getElementById('todoBtn')
const eventsBtn = document.getElementById('eventsBtn')
const settingsBtn = document.getElementById('settingsBtn')

watchBtn.addEventListener('click', () => {
    if (actualApp != 'watch') {
        eventManager('check')
        dncScreen.style.display = 'block'
        wallpaper.style.opacity = '0'
        watchApp.style.opacity = '0'
        alarmApp.style.opacity = '0'
        todoApp.style.opacity = '0'
        eventsApp.style.opacity = '0'
        settingsApp.style.opacity = '0'
        actualApp = 'watch'
        setTimeout(() => {
            dncScreen.removeAttribute('style')
            wallpaper.removeAttribute('style')
            watchApp.removeAttribute('style')
            alarmApp.removeAttribute('style')
            todoApp.removeAttribute('style')
            eventsApp.removeAttribute('style')
            settingsApp.removeAttribute('style')
            lSound()
        }, 700);
    }
})

alarmBtn.addEventListener('click', () => {
    if (actualApp != 'alarm') {
        dncScreen.style.display = 'block'
        wallpaper.style.opacity = '0'
        watchApp.style.opacity = '0'
        alarmApp.style.opacity = '0'
        todoApp.style.opacity = '0'
        eventsApp.style.opacity = '0'
        settingsApp.style.opacity = '0'
        actualApp = 'alarm'
        setTimeout(() => {
            dncScreen.removeAttribute('style')
            wallpaper.removeAttribute('style')
            watchApp.style.display = 'none'
            alarmApp.removeAttribute('style')
            todoApp.removeAttribute('style')
            eventsApp.removeAttribute('style')
            settingsApp.removeAttribute('style')
            alarmApp.style.display = 'block'
            lSound()
        }, 700);
    }
})

todoBtn.addEventListener('click', () => {
    if (actualApp != 'todo') {
        dncScreen.style.display = 'block'
        wallpaper.style.opacity = '0'
        watchApp.style.opacity = '0'
        alarmApp.style.opacity = '0'
        todoApp.style.opacity = '0'
        eventsApp.style.opacity = '0'
        settingsApp.style.opacity = '0'
        actualApp = 'todo'
        setTimeout(() => {
            dncScreen.removeAttribute('style')
            wallpaper.removeAttribute('style')
            watchApp.style.display = 'none'
            alarmApp.removeAttribute('style')
            todoApp.removeAttribute('style')
            eventsApp.removeAttribute('style')
            settingsApp.removeAttribute('style')
            todoApp.style.display = 'block'
            lSound()
        }, 700);
    }
})

eventsBtn.addEventListener('click', () => {
    if (actualApp != 'events') {
        dncScreen.style.display = 'block'
        wallpaper.style.opacity = '0'
        watchApp.style.opacity = '0'
        alarmApp.style.opacity = '0'
        todoApp.style.opacity = '0'
        eventsApp.style.opacity = '0'
        settingsApp.style.opacity = '0'
        actualApp = 'events'
        setTimeout(() => {
            dncScreen.removeAttribute('style')
            wallpaper.removeAttribute('style')
            watchApp.style.display = 'none'
            alarmApp.removeAttribute('style')
            todoApp.removeAttribute('style')
            eventsApp.removeAttribute('style')
            settingsApp.removeAttribute('style')
            eventsApp.style.display = 'block'
            lSound()
        }, 700);
    }
})

settingsBtn.addEventListener('click', () => {
    if (actualApp != 'settings') {
        dncScreen.style.display = 'block'
        wallpaper.style.opacity = '0'
        watchApp.style.opacity = '0'
        alarmApp.style.opacity = '0'
        todoApp.style.opacity = '0'
        eventsApp.style.opacity = '0'
        settingsApp.style.opacity = '0'
        actualApp = 'settings'
        setTimeout(() => {
            dncScreen.removeAttribute('style')
            wallpaper.removeAttribute('style')
            watchApp.style.display = 'none'
            alarmApp.removeAttribute('style')
            todoApp.removeAttribute('style')
            eventsApp.removeAttribute('style')
            settingsApp.removeAttribute('style')
            settingsApp.style.display = 'block'
            lSound()
        }, 700);
    }
})

// Home Menu Colorizer
document.getElementById('homeColor').addEventListener('change', () => {
    let check = document.getElementById('homeColor').checked
    if (check) {
        homeMenu.classList.add('homeMenuAccent')
        personalization.accentMenu = true
    } else {
        homeMenu.classList.remove('homeMenuAccent')
        personalization.accentMenu = false
    }

    localStorage.setItem('personalization', JSON.stringify(personalization))
})