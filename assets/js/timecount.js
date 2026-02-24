const dfTime = document.getElementById('time')
const dfDate = document.getElementById('date')
let isLoadingTime = true
let apiLink = 'https://www.timeapi.io/api/time/current/ip?ipAddress=127.0.0.1'

// Apps clock
const aClock = document.getElementById('aClock')
const tClock = document.getElementById('tClock')
const eClock = document.getElementById('eClock')
const sClock = document.getElementById('sClock')

const dtClock = document.getElementById('dtClock')
const dtDate = document.getElementById('dtDate')

let webUpdate, webData, date, localStart, apiDate, lastResync

let time, day;

const timeZoneMapping = {
    '-12': 'Etc%2FGMT%2B12',
    '-11': 'Etc%2FGMT%2B11',
    '-10': 'Etc%2FGMT%2B10',
    '-9': 'Etc%2FGMT%2B9',
    '-8': 'Etc%2FGMT%2B8',
    '-7': 'Etc%2FGMT%2B7',
    '-6': 'Etc%2FGMT%2B6',
    '-5': 'Etc%2FGMT%2B5',
    '-4': 'Etc%2FGMT%2B4',
    '-3': 'Etc%2FGMT%2B3',
    '-2': 'Etc%2FGMT%2B2',
    '-1': 'Etc%2FGMT%2B1',
    '0': 'Etc%2FUTC',
    '1': 'Etc%2FGMT-1',
    '2': 'Etc%2FGMT-2',
    '3': 'Etc%2FGMT-3',
    '4': 'Etc%2FGMT-4',
    '5': 'Etc%2FGMT-5',
    '6': 'Etc%2FGMT-6',
    '7': 'Etc%2FGMT-7',
    '8': 'Etc%2FGMT-8',
    '9': 'Etc%2FGMT-9',
    '10': 'Etc%2FGMT-10',
    '11': 'Etc%2FGMT-11',
    '12': 'Etc%2FGMT-12'
};

async function getWebDate() {
    try {
        webUpdate = await fetch(apiLink)
        webData = await webUpdate.json()
        localStart = performance.now()
        if (webUpdate.ok) {
            lastResync = 0
            isLoadingTime = false
            console.log('Time OK')
            console.log(webData)
        }

        const addZero = (n) => {
            return ('0' + n).slice(-2)
        }

        const weekDay = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        const cWeekDay = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

        function updateWatches() {
            if (isLoadingTime) return;
        }
    } catch {

    }
}

getWebDate()