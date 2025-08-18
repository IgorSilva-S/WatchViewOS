const sHome = document.getElementById('sHome')
const sHeader = document.getElementById('stgHeader')
const backBtn = document.getElementById('backSettings')
const sName = document.getElementById('settingName')
const sysInfo = document.getElementById('sysInfo')

document.getElementById('sysBtn').addEventListener('click', () => {
    sHome.style.opacity = '0'
    setTimeout(() => {
        sysInfo.style.display = 'block'
        sHome.style.display = 'none'
        backBtn.style.display = 'flex'
        sHeader.classList.add('backHeader')
        sName.innerHTML = 'Sistema'
    }, 400);
})

backBtn.addEventListener('click', () => {
    sysInfo.style.opacity = '0'
    setTimeout(() => {
        sysInfo.removeAttribute('style')
        sHome.removeAttribute('style')
        backBtn.removeAttribute('style')
        sHeader.classList.remove('backHeader')
        sName.innerHTML = 'Configurações'
    }, 400);
})

// System basics
document.getElementById('liteModel').addEventListener('change', () => {
    let lm = document.getElementById('liteModel').checked
    if (lm) {
        document.getElementById('mainCss').href = 'assets/css/lite.css'
    } else {
        document.getElementById('mainCss').href = 'assets/css/style.css'
    }
})