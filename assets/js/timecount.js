const dfTime = document.getElementById('time')
const dfDate = document.getElementById('date')
let isLoadingTime = true
let apiLink = 'https://worldtimeapi.org/api/ip'

// Apps clock
const aClock = document.getElementById('aClock')
const tClock = document.getElementById('tClock')
const eClock = document.getElementById('eClock')
const sClock = document.getElementById('sClock')

const dtClock = document.getElementById('dtClock')
const dtDate = document.getElementById('dtDate')

let webUpdate, webData, date, localStart, apiDate, lastResync

let time, day;

async function getWebDate() {
    try {
        webUpdate = await fetch(apiLink)
        webData = await webUpdate.json()
        apiDate = Date.parse(webData.datetime)
        localStart = performance.now()
        if (webUpdate.ok) {
            lastResync = 0
            isLoadingTime = false
        }

        const addZero = (n) => {
            return ('0' + n).slice(-2)
        }

        const weekDay = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        const cWeekDay = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

        function updateWatch() {
            if (isLoadingTime || typeof date !== 'number' || isNaN(date)) return;
            const wDate = new Date(date)
            let showSec = document.getElementById('clockSec').checked
            let showYD = document.getElementById('clockYearDay').checked
            let showYW = document.getElementById('clockYearWeek').checked
            if (showSec) {
                dfTime.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())}:${addZero(wDate.getSeconds())}`
            } else {
                dfTime.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())}`
            }
            time = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())}`
            day = weekDay[wDate.getDay()]
            dfDate.innerHTML = `${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
            if (showYD) {
                document.getElementById('yearDay').innerText = `Dia nº ${webData.day_of_year}`
            } else {
                document.getElementById('yearDay').innerText = ''
            }
            if (showYW) {
                document.getElementById('yearWeek').innerText = `Semana nº ${webData.week_number}`
            } else {
                document.getElementById('yearWeek').innerText = ''
            }
            aClock.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())} - ${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
            tClock.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())} - ${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
            eClock.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())} - ${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
            sClock.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())} - ${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`
            dtClock.innerText = `${addZero(wDate.getHours())}:${addZero(wDate.getMinutes())}`
            dtDate.innerHTML = `${weekDay[wDate.getDay()]}, ${addZero(wDate.getDate())}/${addZero(wDate.getMonth() + 1)}/${wDate.getFullYear()}`

            if (!showYD && !showYW) {
                document.getElementById('eData').style.display = 'none'
            } else {
                document.getElementById('eData').removeAttribute('style')
            }
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
            console.log(`Ressincronizando de ${apiLink}`)
            apiDate = null
            date = null
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
            dtClock.innerHTML = `<div class="loading"></div>`
            dtDate.innerHTML = ``
            try {
                webUpdate = await fetch(apiLink)
                webData = await webUpdate.json()
                apiDate = Date.parse(webData.utc_datetime)
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

        document.getElementById('extraResponse').addEventListener('click', () => {
            document.getElementById('popContent').innerHTML = `
                <h1>Detalhes da Data e Hora</h1>

                UTC: ${webData.utc_offset} (${webData.abbreviation}); <br>
                IANA Timezone (Fuso horário IANA): ${webData.timezone}; <br>
                Dia da semana: ${webData.day_of_week} (ou, ${cWeekDay[webData.day_of_week]}); <br>
                Dia do ano: ${webData.day_of_year}; <br>
                Marca temporal Unix: ${webData.unixtime}; <br>
                Número da semana: ${webData.week_number}.
            `
            openPopup()
        })

        document.getElementById('bruteResp').addEventListener('click', () => {
            let luDate = new Date(apiDate)
            document.getElementById('popContent').innerHTML = `
                <h1>Resposta bruta API</h1>

                Checado de: ${apiLink} <br>
                Data da API: ${apiDate} <br>
                Ultima atualização: ${luDate.getHours()}:${luDate.getMinutes()}:${luDate.getSeconds()}:${luDate.getMilliseconds()}

                <br>
                Resposta completa: <br>
                <pre>${JSON.stringify(webData, null, 2)}</pre>
            `
            openPopup()
        })

    } catch (err) {
        console.error(`Problema para chamada: ${err}`)
        console.warn('Reinciando chamada')
        getWebDate()
    }
}

getWebDate()
