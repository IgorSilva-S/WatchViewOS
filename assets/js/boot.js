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

// Settings boot
applyNewSound(settings.sounds)
document.getElementById('soundChanger').value = settings.sounds
document.getElementById('BCLabel').style.backgroundColor = document.getElementById('bColor').value

function settingsAlign() {
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
    if (data.useAccent == true) {
        homeMenu.classList.add('homeMenuAccent')
        document.getElementById('homeColor').checked = true
    } else {
        homeMenu.classList.remove('homeMenuAccent')
        document.getElementById('homeColor').checked = false
    }

    if (data.fullscreen == true) {
        homeMenu.setAttribute('type', 'fullscreen')
        document.getElementById('fullHomeMenu').checked = true
    } else {
        homeMenu.removeAttribute('type')
        document.getElementById('fullHomeMenu').checked = false
    }
    HMEffectChanger(data.effectType)
}

homeMenuBOOT(homeMenuData)