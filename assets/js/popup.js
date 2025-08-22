function openPopup() {
    document.getElementById('popUp').style.display = 'block'
    setTimeout(() => {
        document.getElementById('popUp').style.opacity = '1'
        document.getElementById('popUp').style.scale = '1'
    }, 1);
}

document.getElementById('closePop').addEventListener('click', () => {
    document.getElementById('popUp').style.opacity = '0'
    document.getElementById('popUp').style.scale = '.9'
    setTimeout(() => {
        document.getElementById('popUp').removeAttribute('style')
    }, 200);
})