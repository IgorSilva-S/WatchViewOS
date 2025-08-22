const buttons = [...document.getElementsByTagName('button')]
const checks = [...document.querySelectorAll('[type="checkbox"]')]
const colorLabels = [...document.getElementsByClassName('colorLabel')]
const secBtns = [...document.getElementsByClassName('secBtn')]
let isMobile = window.matchMedia("(max-height: 500px)").matches ? true : false

// Sounds
const hoverSound = document.getElementById('hover')
const clickSound = document.getElementById('clickbtn')
const clickLinkSound = document.getElementById('clicklink')
const checkboxClickSound = document.getElementById('clickcb')
const loadingSound = document.getElementById('loadingAudio')
const backSound = document.getElementById('backsound')
const openAppSound = document.getElementById('openApp')

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        let canPlaySFX = document.getElementById('sysSounds').checked
        if (canPlaySFX && !isMobile) {
            hoverSound.currentTime = 0
            hoverSound.play()
        }
    })

    button.addEventListener('click', () => {
        let canPlaySFX = document.getElementById('sysSounds').checked
        if (canPlaySFX) {
            clickSound.currentTime = 0
            clickSound.play()
        }
    })
})

checks.forEach(check => {
    check.addEventListener('mouseenter', () => {
        let canPlaySFX = document.getElementById('sysSounds').checked
        if (canPlaySFX && !isMobile) {
            hoverSound.currentTime = 0
            hoverSound.play()
        }
    })

    check.addEventListener('click', () => {
        let canPlaySFX = document.getElementById('sysSounds').checked
        if (canPlaySFX) {
            checkboxClickSound.currentTime = 0
            checkboxClickSound.play()
        }
    })
})

colorLabels.forEach(colorLabel => {
    colorLabel.addEventListener('mouseenter', () => {
        let canPlaySFX = document.getElementById('sysSounds').checked
        if (canPlaySFX && !isMobile) {
            hoverSound.currentTime = 0
            hoverSound.play()
        }
    })

    colorLabel.addEventListener('click', () => {
        let canPlaySFX = document.getElementById('sysSounds').checked
        if (canPlaySFX) {
            checkboxClickSound.currentTime = 0
            checkboxClickSound.play()
        }
    })
})

function lSound() {
    let canPlaySFX = document.getElementById('sysSounds').checked
    if (canPlaySFX) {
        if (actualApp != 'watch' && isLoadingTime && !homeMenuOpened) {
            loadingSound.play()
        } else {
            loadingSound.pause()
            loadingSound.currentTime = 0
        }
    } else {
        loadingSound.pause()
        loadingSound.currentTime = 0
    }
}

backBtn.addEventListener('click', () => {
    let canPlaySFX = document.getElementById('sysSounds').checked
    if (canPlaySFX) {
        clickSound.pause()
        clickSound.currentTime = 0
        backSound.currentTime = 0
        backSound.play()
    }
})

document.getElementById('closePop').addEventListener('click', () => {
    let canPlaySFX = document.getElementById('sysSounds').checked
    if (canPlaySFX) {
        clickSound.pause()
        clickSound.currentTime = 0
        backSound.currentTime = 0
        backSound.play()
    }
})

Array.from(document.getElementById('abc').children).forEach(element => {
    element.addEventListener('click', () => {
        let canPlaySFX = document.getElementById('sysSounds').checked
        if (canPlaySFX) {
            clickSound.pause()
            clickSound.currentTime = 0
            openAppSound.currentTime = 0
            openAppSound.play()
        }
    })
});
