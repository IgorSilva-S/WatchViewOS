const noSleep = new NoSleep();

noSleep.enable()

const dncScreen = document.getElementById('dnc')

let connected = true

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

// Apps Boot
bootData()
todoManager('load')
alarmManager('load')

// Settings boot
applyNewSound(settings.sounds)
document.getElementById('soundChanger').value = settings.sounds
document.getElementById('BCLabel').style.backgroundColor = document.getElementById('bColor').value