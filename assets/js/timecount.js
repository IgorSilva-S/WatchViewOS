const dfTime = document.getElementById('time')
const dfDate = document.getElementById('date')
let isLoadingTime = true

// Apps clock
const aClock = document.getElementById('aClock')
const tClock = document.getElementById('tClock')
const eClock = document.getElementById('eClock')
const sClock = document.getElementById('sClock')

const dtClock = document.getElementById('dtClock')
const dtDate = document.getElementById('dtDate')

let webUpdate, webData, date, localStart, apiDate, lastResync

async function getWebDate() {
    try {
        webUpdate = await fetch('http://worldtimeapi.org/api/ip')
        webData = await webUpdate.json()
        apiDate = new Date(webData.datetime).getTime()
        localStart = performance.now()
        if (webUpdate.ok) {
            lastResync = 0
            isLoadingTime = false
        }

        const addZero = (n) => {
            return ('0' + n).slice(-2)
        }

        const weekDay = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

        function updateWatch() {
            const wDate = new Date(date)
            dfTime.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())}`
            dfDate.innerHTML = `${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
            aClock.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())} - ${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
            tClock.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())} - ${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
            eClock.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())} - ${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
            sClock.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())} - ${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
            dtClock.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())}`
            dtDate.innerHTML = `${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
        }

        function updateDate() {
            if (!webData) return;
            const timeNow = performance.now() - localStart
            date = apiDate + timeNow
        }

        setInterval(() => {
            updateDate()
            updateWatch()
        }, 1000);

        async function resync() {
            console.log('Ressincronizando')
            isLoadingTime = true
            dfTime.innerHTML = `           
            <div class="loadingContainer">
                <div class="loadingDot"></div>
                <div class="loadingDot" style="animation-delay: .2s;"></div>
                <div class="loadingDot" style="animation-delay: .4s;"></div>
                <div class="loadingDot" style="animation-delay: .6s;"></div>
                <div class="loadingDot" style="animation-delay: .8s;"></div>
            </div>`
            dfDate.innerHTML = `Buscando horário`
            aClock.innerHTML = `<div class="loading"></div>`
            tClock.innerHTML = `<div class="loading"></div>`
            eClock.innerHTML = `<div class="loading"></div>`
            sClock.innerHTML = `<div class="loading"></div>`
            try {
                webUpdate = await fetch('http://worldtimeapi.org/api/ip')
                webData = await webUpdate.json()
                apiDate = new Date(webData.datetime).getTime()
                localStart = performance.now()
                if (webUpdate.ok) {
                    console.log('Ressincronização feita com sucesso')
                    lastResync = 0
                    isLoadingTime = false
                }
            } catch (err) {
                console.error(`Problema para ressincronização: ${err}`)
                console.warn('Reinciando sincronização')
                resync()
            }
        }

        setInterval(() => {
            lastResync++
            let txt = 'minutos'
            let minResync = Math.floor(lastResync / 60)
            if (minResync == 1) {
                txt = 'minuto'
            }

            document.getElementById('lastResync').innerText = `Há ${minResync} ${txt} atrás`

            if (lastResync >= 600) {
                resync()
            }

        }, 1000);

        document.getElementById('syncNow').addEventListener('click', () => {
            resync()
        })

    } catch (err) {
        console.error(`Problema para chamada: ${err}`)
        console.warn('Reinciando chamada')
        getWebDate()
    }
}

getWebDate()
