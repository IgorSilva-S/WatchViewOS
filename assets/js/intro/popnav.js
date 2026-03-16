let actualPage = 0
let openedHome = false

function alignBtn() {
    if (actualPage <= 0) {
        document.getElementById('lastPage').style.display = 'none'
    } else {
        document.getElementById('lastPage').removeAttribute('style')
    }

    if (actualPage != 0 && (actualPage < 8 || actualPage > 8)) {
        document.getElementById('nextPage').innerText = 'Continuar'
    } else if (actualPage == 8) {
        document.getElementById('nextPage').innerText = 'Ir para o sistema'
    } else {
        document.getElementById('nextPage').innerText = 'Iniciar Setup'
    }
}

function pageCorrection() {
    let pages = [...document.getElementsByClassName('PUC')]
    pages.forEach(p => {
        p.style.opacity = '0'
        setTimeout(() => {
            p.scrollTop = 0
            p.removeAttribute('style')
            pages[actualPage].style.display = 'flex'
        }, 190);
    })
}

document.getElementById('nextPage').addEventListener('click', () => {
    if (actualPage == 8) {
        localStorage.setItem('settings', JSON.stringify(settings))
        localStorage.setItem('personalization', JSON.stringify(personalization))
        localStorage.setItem('homeMenu', JSON.stringify(homeMenuData))
        localStorage.setItem('clearSetup', true)
        let songVol = 1
        document.getElementById('popup').style.opacity = 0
        let int = setInterval(() => {
            songVol = songVol - 0.01
            try {
                document.getElementById('introMusic').volume = songVol
            } catch {
                console.log('No Vol')
            }
            console.log(songVol)
            if (songVol <= 0) {
                clearInterval(int)
                setTimeout(() => {
                    location.href = 'index.html'
                }, 200);
            }
        }, 1);
    }
    actualPage++
    if (actualPage == 5 && !openedHome) {
        document.getElementById('nextPage').disabled = true
    } else {
        document.getElementById('nextPage').disabled = false
    }
    alignBtn()
    if (document.getElementById('useSound').checked) {
        document.getElementById('introMusic').play()
    } else {
        document.getElementById('introMusic').currentTime = 0
        document.getElementById('introMusic').pause()
    }

    if (canPlaySFX) {
        let clickSong = document.getElementById('clickbtn')
        clickSong.pause()
        clickSong.currentTime = 0
        clickSong.play()
    }
    if (actualPage < 9) {
        pageCorrection()
    }
})

document.getElementById('lastPage').addEventListener('click', () => {
    actualPage--
    if (actualPage == 5 && !openedHome) {
        document.getElementById('nextPage').disabled = true
    } else {
        document.getElementById('nextPage').disabled = false
    }
    alignBtn()
    if (canPlaySFX) {
        let backSong = document.getElementById('backsound')
        backSong.pause()
        backSong.currentTime = 0
        backSong.play()
    }
    pageCorrection()
})

document.addEventListener('contextmenu', e => {
    if (actualPage == 5) {
        e.preventDefault()
        document.getElementById('nextPage').disabled = false
        document.getElementById('nextPage').click()
        openedHome = true
        if (canPlaySFX) {
            let openHome = document.getElementById('openHome')
            openHome.pause()
            openHome.currentTime = 0
            openHome.play()
        }
    }
})