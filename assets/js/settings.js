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

function restartSettings() {
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
}

// Date and time
document.getElementById('clockSec').addEventListener('change', (e) => {
    if (e.target.checked) {
        settings.showSec = true
    } else {
        settings.showSec = false
    }

    localStorage.setItem('settings', JSON.stringify(settings))
})

document.getElementById('autoIP').addEventListener('change', (e) => {
    if (e.target.checked) {
        settings.autoSync = true
        settings.syncVal = document.getElementById('manualTZ').value
        apiLink = `https://www.timeapi.io/api/time/current/zone?timeZone=${timezone}`
        document.getElementById('manualInfo').classList.add('disabled')
        document.getElementById('manualTZ').disabled = true
    } else {
        settings.autoSync = false
        settings.syncVal = document.getElementById('manualTZ').value
        apiLink = `https://www.timeapi.io/api/time/current/zone?timeZone=${timeZone[document.getElementById('manualTZ').value]}`
        document.getElementById('manualInfo').classList.remove('disabled')
        document.getElementById('manualTZ').disabled = false
    }

    document.getElementById('syncNow').click()
    localStorage.setItem('settings', JSON.stringify(settings))
})

document.getElementById('manualTZ').addEventListener('input', (e) => {
    settings.syncVal = document.getElementById('manualTZ').value
    apiLink = `https://www.timeapi.io/api/time/current/zone?timeZone=${timeZone[e.target.value]}`
    document.getElementById('syncNow').click()
    localStorage.setItem('settings', JSON.stringify(settings))
})

// Personalization
document.getElementById('cgWall').addEventListener('change', () => {
    const fileInput = document.getElementById('cgWall');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const imageUrl = reader.result;
        document.documentElement.style.setProperty('--wallpaperImg', `url(${imageUrl})`)
        document.getElementById('tyWall').innerText = `Imagem`;

        personalization.image = imageUrl
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
    personalization.image = null
    localStorage.setItem('personalization', JSON.stringify(personalization))
})

document.getElementById('wpOpacity').addEventListener('input', () => {
    let val = document.getElementById('wpOpacity').value / 100
    document.documentElement.style.setProperty('--wallpaperOpacity', val)
    personalization.opacity = val
    localStorage.setItem('personalization', JSON.stringify(personalization))
})

document.getElementById('aColor').addEventListener('change', (e) => {
    personalization.accentColor = e.target.value
    localStorage.setItem('personalization', JSON.stringify(personalization))
    document.documentElement.style.setProperty('--primary', e.target.value)
    document.documentElement.style.setProperty('--transPrimary', `${e.target.value}77`)
})


document.getElementById('cLabel').addEventListener('dblclick', () => {
    personalization.accentColor = '#292ccc'
    document.getElementById('aColor').value = '#292ccc'
    document.documentElement.style.removeProperty('--primary')
    document.documentElement.style.removeProperty('--transPrimary')
    document.body.click();
    localStorage.setItem('personalization', JSON.stringify(personalization))
    document.getElementById('RAColor').innerHTML = ""
})

document.getElementById('txtColor').addEventListener('change', e => {
    if (e.target.checked) {
        document.documentElement.style.setProperty('--primaryColor', '#191919')
        personalization.invertColor = true
    } else {
        document.documentElement.style.removeProperty('--primaryColor')
        personalization.invertColor = false
    }

    localStorage.setItem('personalization', JSON.stringify(personalization))
})

document.getElementById('bColor').addEventListener('change', () => {
    let color = document.getElementById('bColor').value
    document.getElementById('BCLabel').style.backgroundColor = color
    document.documentElement.style.setProperty('--wallpaperColor', color)

    personalization.backColor = color
    localStorage.setItem('personalization', JSON.stringify(personalization))
})

document.getElementById('watchColor').addEventListener('change', e => {
    if (e.target.checked) {
        document.documentElement.style.setProperty('--watchColor', '#191919')
        personalization.swapWatch = true
    } else {
        document.documentElement.style.removeProperty('--watchColor')
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
        Horário: TimeAPI.io<br>
        Ícones: Microsoft<br>
        Estilo do programa: IgorSilva-S<br>
        <br>
        SFX:<br>
        Pavs Music;<br>
        Mixkit;<br>
        Pixabay
    `
    openPopup()
})

// Data
document.getElementById('deleteAllData').addEventListener('click', () => {
    document.getElementById('popContent').innerHTML = `
        <h1>Apagar todos os dados</h1>
        <br><br>
        Você tem certeza absoluta disso? Assim que os dados forem apagados, o WatchViewOS irá reiniciar e não terá como recuperar os dados, a não ser caso você tenha uma cópia dos dados.<br>
        Para extrair uma cópia, use a função "Transferir dados", presente nesta mesma página.
    `
    openPopup()
    document.getElementById('primBtn').removeAttribute('style')
    document.getElementById('primBtn').classList.add('warning')
    document.getElementById('primBtn').innerText = 'Apagar tudo mesmo'
    funcBtn = 'deleteAll'

})

document.getElementById('deleteSpecific').addEventListener('click', () => {
    document.getElementById('popContent').innerHTML = `
        <h1>Apagar dados especificos</h1>
        <br><br>
        Selecione os dados que deseja apagar
        <span class="subText">Selecione no mínimo um, caso tenha errado, feche o popup</span>
        <div class="centerLineObj">
            <input type="checkbox" name="" id="delEvents">
            <div class="col">
                <label for="delEvents">Eventos</label>
                <span class="subText">Todos os eventos salvos no sistema</span>
            </div>
        </div>
        <div class="centerLineObj">
            <input type="checkbox" name="" id="delTodos">
            <div class="col">
                <label for="delTodos">Afazeres</label>
                <span class="subText">Todos os afazeres salvos no sistema</span>
            </div>
        </div>
        <div class="centerLineObj">
            <input type="checkbox" name="" id="delAlarms">
            <div class="col">
                <label for="delAlarms">Alarmes</label>
                <span class="subText">Todos os alarmes salvos no sistema</span>
            </div>
        </div>
        <div class="centerLineObj">
            <input type="checkbox" name="" id="delPersona">
            <div class="col">
                <label for="delPersona">Personalização</label>
                <span class="subText">Apagar dados de customização do sistema</span>
            </div>
        </div>
        <div class="centerLineObj">
            <input type="checkbox" name="" id="delSettings">
            <div class="col">
                <label for="delSettings">Configurações</label>
                <span class="subText">Apaga as configurações do sistema</span>
            </div>
        </div>
        <div class="centerLineObj">
            <input type="checkbox" name="" id="delDatas">
            <div class="col">
                <label for="delDatas">Dados dos mini apps</label>
                <span class="subText">Apaga todas as configurações de todos os mini apps (sem apagar o conteúdo)</span>
            </div>
        </div>
        <div class="centerLineObj">
            <input type="checkbox" name="" id="delHomeMenu">
            <div class="col">
                <label for="delHomeMenu">Menu Home</label>
                <span class="subText">Deleta as configurações do Menu Home</span>
            </div>
        </div>
        <br>
    `
    openPopup()
    document.getElementById('primBtn').removeAttribute('style')
    document.getElementById('primBtn').classList.add('warning')
    document.getElementById('primBtn').innerText = 'Apagar dados'
    funcBtn = 'deleteSpecific'
})

document.getElementById('viewData').addEventListener('click', () => {
    document.getElementById('popContent').innerHTML = `
        <h1>Visualização de dados</h1>
        <br><br>
        Events: <pre>${JSON.stringify(events, null, 2)}</pre><br>
        Todos: <pre>${JSON.stringify(todos, null, 2)}</pre><br>
        Alarms: <pre>${JSON.stringify(alarms, null, 2)}</pre><br>
        Personalization: <pre>${JSON.stringify(personalization, null, 2)}</pre><br>
        Settings: <pre>${JSON.stringify(settings, null, 2)}</pre><br>
        Datas: <pre>${JSON.stringify(datas, null, 2)}</pre><br>
        Home Menu Data: <pre>${JSON.stringify(homeMenuData, null, 2)}</pre><br>
        First Boot: <pre>${JSON.stringify(fBoot, null, 2)}</pre><br>
        --<br>
        Se encontram no localStorage pelos nomes:<br>
        events, todos, alarms, personalization, settings, datas, homeMenu e initialBoot
    `
    openPopup()
})

// Mini Apps
document.getElementById('DND').addEventListener('change', (e) => {
    datas.dnd = e.target.checked
    localStorage.setItem('datas', JSON.stringify(datas))

    DND = e.target.checked

    eventManager('check')

    if (e.target.checked) {
        document.getElementById('dndPill').style.display = 'flex'
    } else {
        document.getElementById('dndPill').removeAttribute('style')
    }
})

document.getElementById('playNoDayAlarm').addEventListener('change', e => {
    datas.playNoDayAlarm = e.target.checked
    localStorage.setItem('datas', JSON.stringify(datas))
})

document.getElementById('removeAlarms').addEventListener('change', e => {
    if (e.target.checked) {
        alarmBtn.style.display = 'none'
    } else {
        alarmBtn.removeAttribute('style')
    }
    datas.notShowAlarm = e.target.checked
    localStorage.setItem('datas', JSON.stringify(datas))
})

document.getElementById('delFinishedTodo').addEventListener('change', e => {
    datas.delFinishedTodo = e.target.checked
    localStorage.setItem('datas', JSON.stringify(datas))
})

document.getElementById('removeTodo').addEventListener('change', e => {
    if (e.target.checked) {
        todoBtn.style.display = 'none'
    } else {
        todoBtn.removeAttribute('style')
    }
    datas.notShowTodo = e.target.checked
    localStorage.setItem('datas', JSON.stringify(datas))
})

document.getElementById('delFinishedEvent').addEventListener('change', e => {
    datas.delFinishedEvent = e.target.checked
    localStorage.setItem('datas', JSON.stringify(datas))
})

document.getElementById('hideEventPill').addEventListener('change', e => {
    datas.hideEventPill = e.target.checked
    localStorage.setItem('datas', JSON.stringify(datas))
    eventManager('check')
})

document.getElementById('removeEventBar').addEventListener('change', e => {
    datas.removeEventBar = e.target.checked
    localStorage.setItem('datas', JSON.stringify(datas))
    eventManager('check')
})

document.getElementById('removeEvents').addEventListener('change', e => {
    if (e.target.checked) {
        eventsBtn.style.display = 'none'
    } else {
        eventsBtn.removeAttribute('style')
    }
    datas.notShowEvents = e.target.checked
    localStorage.setItem('datas', JSON.stringify(datas))
})

document.getElementById('removeTitle').addEventListener('change', e => {
    if (e.target.checked) {
        document.getElementById('homeTitle').innerText = '‎'
    } else {
        document.getElementById('homeTitle').innerText = 'Menu Home'
    }

    homeMenuData.removeTitle = e.target.checked
    localStorage.setItem('homeMenu', JSON.stringify(homeMenuData))
})

document.getElementById('watchDivider').addEventListener('change', () => {
    let check = document.getElementById('watchDivider').checked
    if (check) {
        homeMenuData.divideClock = true
    } else {
        homeMenuData.divideClock = false
    }

    localStorage.setItem('homeMenu', JSON.stringify(homeMenuData))
})

document.getElementById('homeColor').addEventListener('change', () => {
    let check = document.getElementById('homeColor').checked
    if (check) {
        homeMenu.classList.add('homeMenuAccent')
        homeMenuData.useAccent = true
    } else {
        homeMenu.classList.remove('homeMenuAccent')
        homeMenuData.useAccent = false
    }

    localStorage.setItem('homeMenu', JSON.stringify(homeMenuData))
})

document.getElementById('fullHomeMenu').addEventListener('change', () => {
    let check = document.getElementById('fullHomeMenu').checked
    if (check) {
        homeMenu.setAttribute('type', 'fullscreen')
        homeMenuData.fullscreen = true
    } else {
        homeMenu.removeAttribute('type')
        homeMenuData.fullscreen = false
    }

    localStorage.setItem('homeMenu', JSON.stringify(homeMenuData))
})

function HMEffectChanger(val) {
    val == 'fglass' ? homeMenu.className = 'homeMenu' : val == 'lglass' ? homeMenu.className = 'homeMenuLG' : val == 'aero' ? homeMenu.className = 'homeMenuAero' : val == 'opaque' ? homeMenu.className = 'homeMenuOP' : val == 'transparent' ? homeMenu.className = 'homeMenuTP' : homeMenu.className = 'homeMenu';

    if (document.getElementById('homeColor').checked) {
        homeMenu.classList.add('homeMenuAccent')
    }
}

document.getElementById('homeStyle').addEventListener('change', () => {
    let val = document.getElementById('homeStyle').value
    HMEffectChanger(val)
    homeMenuData.effectType = val
    localStorage.setItem('homeMenu', JSON.stringify(homeMenuData))
})