function hoverSound() {
    let hoverSong = document.getElementById('hover')
    hoverSong.pause()
    hoverSong.currentTime = 0
    hoverSong.play()
}

Array.from(document.getElementsByTagName('button')).forEach(btn => {
    btn.addEventListener('mouseenter', hoverSound)
});

Array.from(document.getElementsByClassName('secBtn')).forEach(b => {
    b.addEventListener('mouseenter', hoverSound)
})

Array.from(document.querySelectorAll('[fakeBtn="true"]')).forEach(fb => {
    fb.addEventListener('click', () => {
        let clickSong = document.getElementById('clickbtn')
        clickSong.pause()
        clickSong.currentTime = 0
        clickSong.play()
    })
})
