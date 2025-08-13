let homeMenuOpened = false
const homeMenu = document.getElementById('HM')
const wallpaper = document.getElementById('wallpaper')

document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    if (!homeMenuOpened) {
        homeMenu.style.bottom = '0'
        document.getElementById('watch').style.height = '40vh'
        document.getElementById('openHome').pause()
        document.getElementById('openHome').currentTime = 0
        document.getElementById('openHome').play()
        wallpaper.style.filter = 'blur(15px)'
        homeMenuOpened = true
    } else {
        homeMenu.removeAttribute('style')
        document.getElementById('watch').removeAttribute('style')
        wallpaper.removeAttribute('style')
        homeMenuOpened = false
    }
})