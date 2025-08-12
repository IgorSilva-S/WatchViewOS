let homeMenuOpened = false
const homeMenu = document.getElementById('HM')

document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    if (!homeMenuOpened) {
        homeMenu.style.bottom = '0'
        document.getElementById('watch').style.height = '40vh'
        document.getElementById('openHome').play()
        homeMenuOpened = true
    } else {
        homeMenu.removeAttribute('style')
        document.getElementById('watch').removeAttribute('style')
        homeMenuOpened = false
    }
})