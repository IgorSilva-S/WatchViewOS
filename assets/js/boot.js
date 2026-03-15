const systemVersion = '1.0'
document.getElementById('sysVer').innerHTML = `Ver ${systemVersion}`

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
eventManager('load')
todoManager('load')
alarmManager('load')

//DND State
let DND = datas.dnd
if (DND) {
    document.getElementById('DND').checked = true
    document.getElementById('dndPill').style.display = 'flex'
}

// Settings boot
document.getElementById('BCLabel').style.backgroundColor = document.getElementById('bColor').value

function settingsAlign() {
    if (settings.showSec) {
        document.getElementById('clockSec').checked = true
    }

    if (settings.lite == true) {
        document.getElementById('liteModel').checked = true
        document.getElementById('mainCss').href = 'assets/css/lite.css'
    }

    if (settings.noSound == true) {
        document.getElementById("sysSounds").checked = false
    }

    if (settings.noFS == true) {
        document.getElementById("dblclkFS").checked = false
    }
}


insertDay(fBoot)
settingsAlign()

// Personalization Boot
function bootPersona(data) {
    if (data.image != null) {
        document.getElementById('wallImg').innerHTML = `
        :root {
            --wallpaperImg: url(${data.image});
        }
    `
        document.getElementById('tyWall').innerText = `Imagem`;
    }

    if (data.backColor != undefined) {
        document.getElementById('BCLabel').style.backgroundColor = data.backColor
        document.getElementById('bColor').value = data.backColor
        document.getElementById('wallColor').innerHTML = `
        :root {
            --wallpaperColor: ${data.backColor};
            --wallpaperOpacity: ${data.opacity}
        }
    `
    }

    if (data.opacity != undefined) {
        document.getElementById('wallColor').innerHTML = `
        :root {
            --wallpaperColor: ${data.backColor};
            --wallpaperOpacity: ${data.opacity}
        }
    `

        document.getElementById('wpOpacity').value = data.opacity * 100
    }

    if (data.accentColor != undefined) {
        document.getElementById('aColor').value = data.accentColor
        document.getElementById('RAColor').innerHTML = `
        :root {
            --primary: ${data.accentColor};
            --transPrimary: ${data.accentColor}77;
        }
    `
    }

    if (data.invertColor == true) {
        document.getElementById('RAText').innerHTML = `
            :root {
               --primaryColor: #191919;
            }
        `
        document.getElementById('txtColor').checked = true
    }

    if (data.swapWatch == true) {
        document.getElementById('wallTxt').innerHTML = `
            :root {
               --watchColor: #191919;
            }
        `
        document.getElementById('watchColor').checked = true
    }
}

bootPersona(personalization)

// Home Menu BOOT
function homeMenuBOOT(data) {
    if (data.removeTitle == true) {
        document.getElementById('homeTitle').innerText = '‎'
        document.getElementById('removeTitle').checked = true
    }

    if (data.useAccent == true) {
        homeMenu.classList.add('homeMenuAccent')
        document.getElementById('homeColor').checked = true
    }

    if (data.fullscreen == true) {
        homeMenu.setAttribute('type', 'fullscreen')
        document.getElementById('fullHomeMenu').checked = true
    }

    if (data.divideClock == false) {
        document.getElementById('watchDivider').checked = false
    }
    HMEffectChanger(data.effectType)
    document.getElementById('homeStyle').value = data.effectType
}

homeMenuBOOT(homeMenuData)