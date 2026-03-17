let events, todos, alarms, personalization, settings, datas, homeMenuData, fBoot, clearSetup;

events = JSON.parse(localStorage.getItem('events')) || [];
todos = JSON.parse(localStorage.getItem('todos')) || [];
alarms = JSON.parse(localStorage.getItem('alarms')) || [];
personalization = JSON.parse(localStorage.getItem('personalization')) || {};
settings = JSON.parse(localStorage.getItem('settings')) || {};
datas = JSON.parse(localStorage.getItem('datas')) || {};
homeMenuData = JSON.parse(localStorage.getItem('homeMenu')) || {};
fBoot = localStorage.getItem('initialBoot');
clearSetup = localStorage.getItem('clearSetup') || false

/* Creating System Data*/
document.getElementById('sysSounds').addEventListener('change', e => {
    canPlaySFX = e.target.checked
    settings.noSound = !e.target.checked
})

/* Date and time settings*/
document.getElementById('ipSync').addEventListener('change', e => {
    settings.autoSync = e.target.checked
    settings.syncVal = document.getElementById('gmtChoose').value
})

document.getElementById('gmtChoose').addEventListener('input', e => {
    settings.syncVal = e.target.value
})

/*Personalization*/
document.getElementById('liteModel').addEventListener('change', e => {
    settings.lite = e.target.checked
})

document.getElementById('wallChoose').value = ''
document.getElementById('wallChoose').addEventListener('change', e => {
    const fileInput = e.target;
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const imageUrl = reader.result;
        document.documentElement.style.setProperty('--wallpaperImg', `url(${imageUrl})`)

        personalization.image = imageUrl
    };

    if (file) {
        reader.readAsDataURL(file);
    }
})

document.getElementById('removeImage').addEventListener('click', () => {
    document.getElementById('wallChoose').value = ''
    document.documentElement.style.removeProperty('--wallpaperImg')
    personalization.image = null
    if (canPlaySFX) {
        let backSong = document.getElementById('backsound')
        backSong.pause()
        backSong.currentTime = 0
        backSong.play()
    }
})

document.getElementById('aColor').addEventListener('input', e => {
    personalization.accentColor = e.target.value
    document.documentElement.style.setProperty('--primary', e.target.value)
    document.documentElement.style.setProperty('--transPrimary', `${e.target.value}77`)
})

document.getElementById('wallOpacity').addEventListener('input', () => {
    let val = document.getElementById('wallOpacity').value / 100
    document.documentElement.style.setProperty('--wallpaperOpacity', val)
    personalization.opacity = val
})

document.getElementById('txtColor').addEventListener('change', e => {
    if (e.target.checked) {
        document.documentElement.style.setProperty('--primaryColor', '#191919')
        personalization.invertColor = true
    } else {
        document.documentElement.style.removeProperty('--primaryColor')
        personalization.invertColor = false
    }
})

document.getElementById('bColor').addEventListener('input', () => {
    let color = document.getElementById('bColor').value
    document.getElementById('BCLabel').style.backgroundColor = color
    document.documentElement.style.setProperty('--wallpaperColor', color)

    personalization.backColor = color
})

document.getElementById('watchColor').addEventListener('change', e => {
    if (e.target.checked) {
        document.documentElement.style.setProperty('--watchColor', '#191919')
        personalization.swapWatch = true
    } else {
        document.documentElement.style.removeProperty('--watchColor')
        personalization.swapWatch = false
    }

})

// Home Menu Editor
document.getElementById('removeTitle').addEventListener('change', e => {
    homeMenuData.removeTitle = e.target.checked
})

document.getElementById('watchDivider').addEventListener('change', e => {
    homeMenuData.divideClock = e.target.checked
})

document.getElementById('homeColor').addEventListener('change', e => {
    homeMenuData.useAccent = e.target.checked
})

document.getElementById('fullHomeMenu').addEventListener('change', e => {
    homeMenuData.fullscreen = e.target.checked

})

document.getElementById('homeStyle').addEventListener('change', e => {
    homeMenuData.effectType = e.target.value
})

function homeText() {
        let isMobile = window.matchMedia("(max-height: 500px)").matches ? true : false

    if (isMobile) {
        document.getElementById('howToOpenHM').innerText = '*Aperte e segure a tela.'
    } else {
        document.getElementById('howToOpenHM').innerText = '*Pressione o botão secundário do mouse.'
    }
}

homeText()

// Organize Setup texts
window.addEventListener('resize', homeText)