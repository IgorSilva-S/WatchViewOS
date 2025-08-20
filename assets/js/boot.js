const noSleep = new NoSleep();

noSleep.enable()

// Fullscreen 
let isFS = false
const fsToggle = document.getElementById('dblclkFS')

document.documentElement.addEventListener('dblclick', (e) => {
    let isMobile = window.matchMedia("(max-height: 500px)").matches ? true : false
    let doc = document.documentElement
    e.preventDefault()
    if (isMobile && fsToggle.checked) {
        if (!isFS) {
            if (doc.requestFullscreen) {
                doc.requestFullscreen()
            } else if (doc.webkitRequestFullscreen) {
                doc.webkitRequestFullscreen()
            }

            isFS = true
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }

            isFS = false
        }
    }
})