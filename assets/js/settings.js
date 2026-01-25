const sHome = document.getElementById('sHome')
const sHeader = document.getElementById('stgHeader')
const backBtn = document.getElementById('backSettings')
const sName = document.getElementById('settingName')
const timeInfo = document.getElementById('timeInfo')
const cusInfo = document.getElementById('cusInfo')
const sysInfo = document.getElementById('sysInfo')
const dataInfo = document.getElementById('dataInfo')
const mahmInfo = document.getElementById('mahmInfo')

document.getElementById('timeBtn').addEventListener('click', () => {
    sHome.style.opacity = '0'
    setTimeout(() => {
        timeInfo.style.display = 'block'
        sHome.style.display = 'none'
        backBtn.style.display = 'flex'
        sHeader.classList.add('backHeader')
        sName.innerHTML = 'Data e Hora'
    }, 400);
})

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

document.getElementById('cusBtn').addEventListener('click', () => {
    sHome.style.opacity = '0'
    setTimeout(() => {
        cusInfo.style.display = 'block'
        sHome.style.display = 'none'
        backBtn.style.display = 'flex'
        sHeader.classList.add('backHeader')
        sName.innerHTML = 'Personalização'
    }, 400);
})

document.getElementById('dataBtn').addEventListener('click', () => {
    sHome.style.opacity = '0'
    setTimeout(() => {
        dataInfo.style.display = 'block'
        sHome.style.display = 'none'
        backBtn.style.display = 'flex'
        sHeader.classList.add('backHeader')
        sName.innerHTML = 'Dados'
    }, 400);
})

document.getElementById('mahmBtn').addEventListener('click', () => {
    sHome.style.opacity = '0'
    setTimeout(() => {
        mahmInfo.style.display = 'block'
        sHome.style.display = 'none'
        backBtn.style.display = 'flex'
        sHeader.classList.add('backHeader')
        sName.innerHTML = 'Mini Apps e Menu Home'
    }, 400);
})


backBtn.addEventListener('click', () => {
    timeInfo.style.opacity = '0'
    sysInfo.style.opacity = '0'
    cusInfo.style.opacity = '0'
    dataInfo.style.opacity = '0'
    mahmInfo.style.opacity = '0'
    setTimeout(() => {
        timeInfo.removeAttribute('style')
        sysInfo.removeAttribute('style')
        cusInfo.removeAttribute('style')
        dataInfo.removeAttribute('style')
        mahmInfo.removeAttribute('style')
        sHome.removeAttribute('style')
        backBtn.removeAttribute('style')
        sHeader.classList.remove('backHeader')
        sName.innerHTML = 'Configurações'
    }, 400);
})

// Date and time


// Personalization
document.getElementById('cgWall').addEventListener('change', () => {
    const fileInput = document.getElementById('cgWall');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const imageUrl = reader.result;
        document.getElementById('wallImg').innerHTML = `
        :root {
            --wallpaperImg: url(${imageUrl});
        }
    `
        document.getElementById('tyWall').innerText = `Imagem`;

        personalization.img = imageUrl
        localStorage.setItem('personalization', JSON.stringify(personalization))

    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('rWall').addEventListener('click', () => {
    document.getElementById('wallImg').innerHTML = ""
    document.getElementById('tyWall').innerText = `Cores`;
    document.getElementById('cgWall').value = '';
    personalization.img = "nothing"
    localStorage.setItem('personalization', JSON.stringify(personalization))
})

document.getElementById('wpOpacity').addEventListener('change', () => {
    let val = document.getElementById('wpOpacity').value / 100
    let color = document.getElementById('bColor').value
    document.getElementById('wallColor').innerHTML = `
        :root {
            --wallpaperColor: ${color};
            --wallpaperOpacity: ${val}
        }
    `
    personalization.opacity = val
    localStorage.setItem('personalization', JSON.stringify(personalization))
})

document.getElementById('aColor').addEventListener('change', () => {
    personalization.primaryColor = document.getElementById('aColor').value
    localStorage.setItem('personalization', JSON.stringify(personalization))
    document.getElementById('RAColor').innerHTML = `
        :root {
            --primary: ${document.getElementById('aColor').value};
            --transPrimary: ${document.getElementById('aColor').value}77;
        }
    `
})


document.getElementById('cLabel').addEventListener('dblclick', () => {
    personalization.primaryColor = '#292ccc'
    localStorage.setItem('personalization', JSON.stringify(personalization))
    document.getElementById('aColor').value = personalization.primaryColor
    document.getElementById('RAColor').innerHTML = ""
})

document.getElementById('txtColor').addEventListener('change', () => {
    let checked = document.getElementById('txtColor').checked
    if (checked) {
        document.getElementById('RAText').innerHTML = `
            :root {
               --primaryColor: #191919;
            }
        `
        personalization.swapAccent = true
    } else {
        document.getElementById('RAText').innerHTML = ""
        personalization.swapAccent = false
    }

    localStorage.setItem('personalization', JSON.stringify(personalization))
})

document.getElementById('bColor').addEventListener('change', () => {
    let color = document.getElementById('bColor').value
    let val = document.getElementById('wpOpacity').value / 100
    document.getElementById('BCLabel').style.backgroundColor = color
    document.getElementById('wallColor').innerHTML = `
        :root {
            --wallpaperColor: ${color};
            --wallpaperOpacity: ${val}
        }
    `

    personalization.wallColor = color
    localStorage.setItem('personalization', JSON.stringify(personalization))
})

document.getElementById('watchColor').addEventListener('change', () => {
    let checked = document.getElementById('watchColor').checked
    if (checked) {
        document.getElementById('wallTxt').innerHTML = `
            :root {
               --watchColor: #191919;
            }
        `

        personalization.swapWatch = true
    } else {
        document.getElementById('wallTxt').innerHTML = ""
        personalization.swapWatch = false
    }

    localStorage.setItem('personalization', JSON.stringify(personalization))
})

// System basics

document.getElementById('dblclkFS').addEventListener('change', () => {
    let checker = document.getElementById('dblclkFS').checked
    if (checker) {
        settings.noFS = false
    } else {
        settings.noFS = true
    }

    localStorage.setItem('settings', JSON.stringify(settings))
})

document.getElementById('sysSounds').addEventListener('change', () => {
    lSound()
    let checker = document.getElementById("sysSounds").checked
    if (checker) {
        settings.noSound = false
    } else {
        settings.noSound = true
    }

    localStorage.setItem('settings', JSON.stringify(settings))
})

document.getElementById('linkLE').addEventListener('click', () => {
    backBtn.click()
    dncScreen.style.display = 'block'
    setTimeout(() => {
        document.getElementById('sysBtn').click()
        setTimeout(() => {
            document.getElementById('liteModel').classList.add('showEffect')
            setTimeout(() => {
                document.getElementById('liteModel').click()
                document.getElementById('liteModel').classList.remove('showEffect')
                dncScreen.removeAttribute('style')
            }, 2700);
        }, 1200);
    }, 1200);
})

document.getElementById('liteModel').addEventListener('change', () => {
    let lm = document.getElementById('liteModel').checked
    if (lm) {
        document.getElementById('mainCss').href = 'assets/css/lite.css'
        settings.lite = true
    } else {
        document.getElementById('mainCss').href = 'assets/css/style.css'
        settings.lite = false
    }

    localStorage.setItem('settings', JSON.stringify(settings))
})

document.getElementById('openCredits').addEventListener('click', () => {
    document.getElementById('popContent').innerHTML = `
        <h1>Créditos</h1>
        <br><br>
        Sons: Nintendo / The Sounds Resource<br>
        Horário: WorldTimeAPI<br>
        Ícones: Microsoft<br>
        Estilo do programa: IgorSilva-S<br>
    `
    openPopup()
})

// Mini Apps
document.getElementById('homeColor').addEventListener('change', () => {
    let check = document.getElementById('homeColor').checked
    if (check) {
        homeMenu.classList.add('homeMenuAccent')
    } else {
        homeMenu.classList.remove('homeMenuAccent')
    }
})

document.getElementById('fullHomeMenu').addEventListener('change', () => {
    let check = document.getElementById('fullHomeMenu').checked
    if (check) {
        homeMenu.setAttribute('type', 'fullscreen')
    } else {
        homeMenu.removeAttribute('type')
    }
})

document.getElementById('homeStyle').addEventListener('change', () => {
    let val = document.getElementById('homeStyle').value

    val == 'fglass' ? homeMenu.className = 'homeMenu' : val == 'lglass' ? homeMenu.className = 'homeMenuLG' : val == 'aero' ? homeMenu.className = 'homeMenuAero' : val == 'opaque' ? homeMenu.className = 'homeMenuOP' : val == 'transparent' ? homeMenu.className = 'homeMenuTP' : homeMenu.className = 'homeMenu'

    if (document.getElementById('homeColor').checked) {
        homeMenu.classList.add('homeMenuAccent')
    }
})