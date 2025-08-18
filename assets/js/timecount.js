const dfTime = document.getElementById('time')
const dfDate = document.getElementById('date')

// Apps clock
const sClock = document.getElementById('sClock')

let webUpdate, webData, date, localStart, apiDate, lastResync

async function getWebDate() {
    try {
        webUpdate = await fetch('http://worldtimeapi.org/api/ip')
        webData = await webUpdate.json()
        apiDate = new Date(webData.datetime).getTime()
        localStart = performance.now()
        if (webUpdate.ok) {
            lastResync = 0
        }

        const addZero = (n) => {
            return ('0' + n).slice(-2)
        }

        const weekDay = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

        function updateWatch() {
            const wDate = new Date(date)
            dfTime.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())}`
            dfDate.innerHTML = `${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
            sClock.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())} - ${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
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
            try {
                webUpdate = await fetch('http://worldtimeapi.org/api/ip')
                webData = await webUpdate.json()
                apiDate = new Date(webData.datetime).getTime()
                localStart = performance.now()
                if (webUpdate.ok) {
                    console.log('Ressincronização feita com sucesso')
                    lastResync = 0
                }
            } catch (err) {
                console.error(`Problema para ressincronização: ${err}`)
                console.warn('Reinciando sincronização')
                resync()
            }
        }

        setInterval(resync, 600000);

        setInterval(() => {
            lastResync++
        }, 1000);

    } catch (err) {
        console.error(`Problema para chamada: ${err}`)
        console.warn('Reinciando chamada')
        getWebDate()
    }
}

getWebDate()
