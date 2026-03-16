let canPlaySFX = true

function hoverSound() {
    if (canPlaySFX) {
        let hoverSong = document.getElementById('hover')
        hoverSong.pause()
        hoverSong.currentTime = 0
        hoverSong.play()
    }
}

Array.from(document.getElementsByTagName('button')).forEach(btn => {
    btn.addEventListener('mouseenter', hoverSound)
});

Array.from(document.getElementsByClassName('secBtn')).forEach(b => {
    b.addEventListener('mouseenter', hoverSound)
})

Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(b => {
    b.addEventListener('mouseenter', hoverSound)
    b.addEventListener('click', () => {
        if (canPlaySFX) {
            let clickSong = document.getElementById('clickcb')
            clickSong.pause()
            clickSong.currentTime = 0
            clickSong.play()
        }
    })
})

Array.from(document.querySelectorAll('[fakeBtn="true"]')).forEach(fb => {
    fb.addEventListener('click', () => {
        if (canPlaySFX) {
            let clickSong = document.getElementById('clickbtn')
            clickSong.pause()
            clickSong.currentTime = 0
            clickSong.play()
        }
    })
})
