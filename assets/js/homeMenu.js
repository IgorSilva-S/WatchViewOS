let homeMenuOpened = false
const homeMenu = document.getElementById('HM')
const wallpaper = document.getElementById('wallpaper')

document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    let isMobile = window.matchMedia("(max-height: 500px)").matches ? true : false
    let phoneUp = window.matchMedia("(max-width: 500px)").matches ? true : false
    if (!homeMenuOpened && !phoneUp) {
        homeMenu.style.bottom = '0'
        if (!isMobile) {
            document.getElementById('watch').style.height = '40vh'
        } else {
            document.getElementById('watch').style.height = '50vh'
        }
        document.getElementById('openHome').pause()
        document.getElementById('openHome').currentTime = 0
        document.getElementById('openHome').play()
        wallpaper.style.filter = 'blur(15px)'
        homeMenuOpened = true
    } else if (!phoneUp) {
        homeMenu.removeAttribute('style')
        document.getElementById('watch').removeAttribute('style')
        wallpaper.removeAttribute('style')
        homeMenuOpened = false
    }
})

Array.from(document.getElementById('abc').children).forEach(element => {
    element.addEventListener('click', () => {
        homeMenu.removeAttribute('style')
        document.getElementById('watch').removeAttribute('style')
        wallpaper.removeAttribute('style')
        homeMenuOpened = false
    })
});