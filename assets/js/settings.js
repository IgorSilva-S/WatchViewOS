const sHome = document.getElementById('sHome')
const sHeader = document.getElementById('stgHeader')
const backBtn = document.getElementById('backSettings')
const sName = document.getElementById('settingName')
const timeInfo = document.getElementById('timeInfo')
const cusInfo = document.getElementById('cusInfo')
const sysInfo = document.getElementById('sysInfo')
const dataInfo = document.getElementById('dataInfo')
const appsInfo = document.getElementById('appsInfo')

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

document.getElementById('appsBtn').addEventListener('click', () => {
    sHome.style.opacity = '0'
    setTimeout(() => {
        appsInfo.style.display = 'block'
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
    appsInfo.style.opacity = '0'
    setTimeout(() => {
        timeInfo.removeAttribute('style')
        sysInfo.removeAttribute('style')
        cusInfo.removeAttribute('style')
        dataInfo.removeAttribute('style')
        appsInfo.removeAttribute('style')
        sHome.removeAttribute('style')
        backBtn.removeAttribute('style')
        sHeader.classList.remove('backHeader')
        sName.innerHTML = 'Configurações'
    }, 400);
})

// Date and Time
document.getElementById('extraBarCB').addEventListener('change', () => {
    let isChecked = document.getElementById('extraBarCB').checked
    if (isChecked) {
        document.getElementById('extraBar').style.opacity = '1'
    } else {
        document.getElementById('extraBar').removeAttribute('style')
    }
})

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
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('rWall').addEventListener('click', () => {
    document.getElementById('wallImg').innerHTML = ""
    document.getElementById('tyWall').innerText = `Cores`;
    document.getElementById('cgWall').value = '';
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
})

document.getElementById('aColor').addEventListener('change', () => {
    document.getElementById('RAColor').innerHTML = `
        :root {
            --primary: ${document.getElementById('aColor').value};
            --transPrimary: ${document.getElementById('aColor').value}77;
        }
    `
})

document.getElementById('txtColor').addEventListener('change', () => {
    let checked = document.getElementById('txtColor').checked
    if (checked) {
        document.getElementById('RAText').innerHTML = `
            :root {
               --primaryColor: #191919;
            }
        `
    } else {
        document.getElementById('RAText').innerHTML = ""
    }
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
})

document.getElementById('watchColor').addEventListener('change', () => {
    let checked = document.getElementById('watchColor').checked
    if (checked) {
        document.getElementById('wallTxt').innerHTML = `
            :root {
               --watchColor: #191919;
            }
        `
    } else {
        document.getElementById('wallTxt').innerHTML = ""
    }
})

// System basics

document.getElementById('sysSounds').addEventListener('change', () => {
    lSound()
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
    } else {
        document.getElementById('mainCss').href = 'assets/css/style.css'
    }
})

document.getElementById('openCredits').addEventListener('click', () => {
    document.getElementById('popContent').innerHTML = `
        <h1>Créditos</h1>
        <br><br>
        Design, funcionalidade: Igor Silva Santos (IgorSilva-S)<br>
        Sons: Nintendo / The Sounds Resource<br>
        Horário: WorldTimeAPI<br>
    `
    openPopup()
})

// Mini Apps
document.getElementById('lgHome').addEventListener('change', () => {
    let accentChecked = document.getElementById('homeColor').checked
    let isChecked = document.getElementById('lgHome').checked
    if (isChecked) {
        homeMenu.className = 'homeMenuLG'
    } else {
        homeMenu.className = 'homeMenu'
    }

    if (accentChecked) {
        homeMenu.classList.add('homeMenuAccent')
    }
})

document.getElementById('aeroHome').addEventListener('change', () => {
    let accentChecked = document.getElementById('homeColor').checked
    let isChecked = document.getElementById('aeroHome').checked
    if (isChecked) {
        homeMenu.className = 'homeMenuAero'
    } else {
        homeMenu.className = 'homeMenu'
    }

    if (accentChecked) {
        homeMenu.classList.add('homeMenuAccent')
    }
})