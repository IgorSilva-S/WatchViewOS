let playingAlarm = false
let playAlarm = true
let curTime = time
let waitAlarmName, waitAlarmHour

let snoozeTimeout

document.getElementById("addAlarm").addEventListener("click", () => {
    document.getElementById("primBtn").removeAttribute("style");
    openPopup();
    funcBtn = "alarmAdd";
    document.getElementById("popContent").innerHTML = `
        <h1>Alarme - Adicionar</h1>

        <label for="alarmName">Nome do Alarme</label>
        <input type="text" placeholder="Insira o nome aqui" id="alarmName">
         <br>
        <label for="alarmHour">Hora do alarme</label>
        <input type="time" id="alarmHour" name="alarmHour">
        <br>
        Dia da semana
        <div class="lLine">
            <div class="cCol">
                <input type="checkbox" name="" id="aDom">
                <label for="aDom">Dom</label>
            </div>
            <div class="cCol">
                <input type="checkbox" name="" id="aSeg">
                <label for="aSeg">Seg</label>
            </div>
            <div class="cCol">
                <input type="checkbox" name="" id="aTer">
                <label for="aTer">Ter</label>
            </div>
            <div class="cCol">
                <input type="checkbox" name="" id="aQua">
                <label for="aQua">Qua</label>
            </div>
            <div class="cCol">
                <input type="checkbox" name="" id="aQui">
                <label for="aQui">Qui</label>
            </div>
            <div class="cCol">
                <input type="checkbox" name="" id="aSex">
                <label for="aSex">Sex</label>
            </div>
            <div class="cCol">
                <input type="checkbox" name="" id="aSab">
                <label for="aSab">Sáb</label>
            </div>
        </div>
        <span>Lembre-se de adicionar nome e hora, são campos obrigatórios</span>
    `;
    document.getElementById("primBtn").innerText = "Adicionar";
});

let alarmSoundInterval;

setInterval(() => {
    alarms.forEach(alarm => {
        let alarmTime = alarm.hour
        let alarmDays = alarm.days
        let alarmName = alarm.name
        let alarmPlayable = alarm.enabled
        let dtlc
        try {
            dtlc = day.toLowerCase()
        } catch {
            console.log('Horário não iniciado')
            return
        }


        if (alarmTime == time && !playingAlarm && alarmDays[dtlc] && playAlarm && alarmPlayable) {
            playingAlarm = true
            waitAlarmHour = alarmTime
            waitAlarmName = alarmName
            clearTimeout(snoozeTimeout)
            document.getElementById('alarmAlert').style.bottom = '0'
            document.getElementById('alarmTimeTxt').innerText = alarmTime
            document.getElementById('alarmNameTxt').innerText = alarmName
            if (actualApp == 'watch') {
                document.getElementById('watch').style.height = '40vh'
            }
            alarmSoundInterval = setInterval(() => {
                if (time != alarmTime) {
                    playingAlarm = false
                    document.getElementById('alarmAlert').removeAttribute('style')
                    if (actualApp == 'watch') {
                        document.getElementById('watch').removeAttribute('style')
                    }
                    alarmBeta.pause()
                    alarmBeta.currentTime = 0
                    clearInterval(alarmSoundInterval)
                    alarmSoundInterval = null
                }
            }, 200);
            alarmBeta.play()
        }

        if (curTime != time) {
            curTime = time
            playAlarm = true
        }
    });
}, 1000);

document.getElementById('stopAlarm').addEventListener('click', () => {
    playingAlarm = false
    playAlarm = false
    document.getElementById('alarmAlert').removeAttribute('style')
    if (actualApp == 'watch') {
        document.getElementById('watch').removeAttribute('style')
    }
    alarmBeta.pause()
    alarmBeta.currentTime = 0
    clearInterval(alarmSoundInterval)
    alarmSoundInterval = null
})

document.getElementById('snoozeAlarm').addEventListener('click', () => {
    playingAlarm = false
    playAlarm = false
    document.getElementById('alarmAlert').removeAttribute('style')
    alarmBeta.pause()
    alarmBeta.currentTime = 0
    clearInterval(alarmSoundInterval)
    alarmSoundInterval = null
    snoozeTimeout = setTimeout(() => {
        playingAlarm = true
        if (actualApp == 'watch') {
            document.getElementById('watch').style.height = '40vh'
        }
        document.getElementById('alarmAlert').style.bottom = '0'
        document.getElementById('alarmTimeTxt').innerText = waitAlarmHour
        document.getElementById('alarmNameTxt').innerText = waitAlarmName
        alarmSoundInterval = setInterval(() => {
            playingAlarm = false
            document.getElementById('alarmAlert').removeAttribute('style')
            if (actualApp == 'watch') {
                document.getElementById('watch').removeAttribute('style')
            }
            alarmBeta.pause()
            alarmBeta.currentTime = 0
            clearInterval(alarmSoundInterval)
            alarmSoundInterval = null
        }, 60000);
        alarmBeta.play()
    }, 300000);
})