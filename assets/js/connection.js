window.addEventListener('offline', () => {
    document.getElementById('noNet').style.display = 'flex'
    connected = false
})

window.addEventListener('online', () => {
    document.getElementById('noNet').removeAttribute('style')
    connected = true
})