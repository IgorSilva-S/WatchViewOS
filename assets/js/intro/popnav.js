let actualPage = 0

function alignBtn() {
    if (actualPage <= 0) {
        document.getElementById('lastPage').style.display = 'none'
    } else {
        document.getElementById('lastPage').removeAttribute('style')
    }

    if (actualPage != 0) {
        document.getElementById('nextPage').innerText = 'Continuar'
    } else {
        document.getElementById('nextPage').innerText = 'Iniciar setup'
    }
}

function pageCorrection() {
    let pages = [...document.getElementsByClassName('PUC')]
    pages.forEach(p => {
        p.style.opacity = '0'
        setTimeout(() => {
            p.removeAttribute('style')
            pages[actualPage].style.display = 'flex'
        }, 190);
    })


}

document.getElementById('nextPage').addEventListener('click', () => {
    actualPage++
    alignBtn()
    if (document.getElementById('useSound').checked) {
        document.getElementById('introMusic').play()
    } else {
        document.getElementById('introMusic').currentTime = 0
        document.getElementById('introMusic').pause()
    }

    let clickSong = document.getElementById('clickbtn')
    clickSong.pause()
    clickSong.currentTime = 0
    clickSong.play()
    pageCorrection()
})

document.getElementById('lastPage').addEventListener('click', () => {
    actualPage--
    alignBtn()
    let backSong = document.getElementById('backsound')
    backSong.pause()
    backSong.currentTime = 0
    backSong.play()
    pageCorrection()
})

