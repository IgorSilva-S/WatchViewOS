const alarmsVersion = '1.0'
document.getElementById('alarmVersion').innerHTML = alarmsVersion

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


        if (alarmTime == time && !playingAlarm && playAlarm && alarmPlayable && !DND) {
            let noneDay = !Object.values(alarmDays).some(d => d)
            let alarmChecker = document.getElementById('playNoDayAlarm').checked
            if (noneDay && alarmChecker) {
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
                        alarmSound.pause()
                        alarmSound.currentTime = 0
                        clearInterval(alarmSoundInterval)
                        alarmSoundInterval = null
                    }
                }, 200);
                alarmSound.play()
            } else if (alarmDays[dtlc]) {
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
                        alarmSound.pause()
                        alarmSound.currentTime = 0
                        clearInterval(alarmSoundInterval)
                        alarmSoundInterval = null
                    }
                }, 200);
                alarmSound.play()
            }
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
    alarmSound.pause()
    alarmSound.currentTime = 0
    clearInterval(alarmSoundInterval)
    alarmSoundInterval = null
})

document.getElementById('snoozeAlarm').addEventListener('click', () => {
    playingAlarm = false
    playAlarm = false
    document.getElementById('alarmAlert').removeAttribute('style')
    alarmSound.pause()
    alarmSound.currentTime = 0
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
            alarmSound.pause()
            alarmSound.currentTime = 0
            clearInterval(alarmSoundInterval)
            alarmSoundInterval = null
        }, 60000);
        alarmSound.play()
    }, 300000);
})

document.getElementById('playAlarm').addEventListener('click', () => {
    sampleAlarm.play()
})

let editingAlarm = -1

function alarmManager(act) {

    if (act.toLowerCase() === 'add') {

        let name = document.getElementById('alarmName').value;
        let hour = document.getElementById('alarmHour').value;

        if (!name.trim() || !hour) return;

        let days = {
            dom: document.getElementById('aDom').checked,
            seg: document.getElementById('aSeg').checked,
            ter: document.getElementById('aTer').checked,
            qua: document.getElementById('aQua').checked,
            qui: document.getElementById('aQui').checked,
            sex: document.getElementById('aSex').checked,
            sáb: document.getElementById('aSab').checked
        };

        let alarm = {
            name,
            hour,
            enabled: true,
            days
        };

        alarms.push(alarm);
        localStorage.setItem('alarms', JSON.stringify(alarms));

        act = 'load';
        closePopup();
    }

    if (act.toLowerCase() === 'load') {

        let alarmContent = document.getElementById('alarmContent');
        alarmContent.innerHTML = '';

        alarms.forEach(alarm => {

            let alarmBox = document.createElement('div');
            alarmBox.className = 'todoBox';

            alarmBox.innerHTML = `
                <div class="alarmInfo">
                    <span class="alarmName">${alarm.name}</span>
                    <span class="alarmHour">${alarm.hour}</span>
                </div>
            `;

            let alarmExtra = document.createElement('div')
            alarmExtra.classList.add('alarmExtra')
            alarmExtra.innerHTML = `

            <div>
                <label class="switch">
                    <input type="checkbox" ${alarm.enabled ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>

            </div>`

            alarmBox.appendChild(alarmExtra)

            let editBtn = document.createElement('button')
            editBtn.className = 'todoDelBtn';
            editBtn.innerHTML = '&#xE70F;'
            editBtn.addEventListener('click', () => {
                editingAlarm = alarms.findIndex(a =>
                    a.name === alarm.name && a.hour === alarm.hour
                );
                openPopup();
                funcBtn = "alarmEdit";
                document.getElementById("popContent").innerHTML = `
                    <h1>Alarme - Editar</h1>

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
    `;
                document.getElementById("primBtn").innerText = "Editar";

                document.getElementById('alarmName').value = alarm.name
                document.getElementById('alarmHour').value = alarm.hour
                document.getElementById('aDom').checked = alarm.days.dom
                document.getElementById('aSeg').checked = alarm.days.seg
                document.getElementById('aTer').checked = alarm.days.ter
                document.getElementById('aQua').checked = alarm.days.qua
                document.getElementById('aQui').checked = alarm.days.qui
                document.getElementById('aSex').checked = alarm.days.sex
                document.getElementById('aSab').checked = alarm.days.sáb
                console.log(editingAlarm)
                document.getElementById('primBtn').removeAttribute('style')

            })

            let delBtn = document.createElement('button');
            delBtn.className = 'todoDelBtn';
            delBtn.innerHTML = '&#xe74d;';
            delBtn.addEventListener('click', () => {
                alarmBox.remove();
                alarms = alarms.filter(a =>
                    !(a.name === alarm.name && a.hour === alarm.hour)
                );
                localStorage.setItem('alarms', JSON.stringify(alarms));
            });



            let switchInput = alarmBox.querySelector('.switch input');

            switchInput.addEventListener('change', () => {
                let index = alarms.findIndex(a =>
                    a.name === alarm.name && a.hour === alarm.hour
                );

                if (index !== -1) {
                    alarms[index].enabled = switchInput.checked;
                    localStorage.setItem('alarms', JSON.stringify(alarms));
                }
            });

            alarmExtra.appendChild(editBtn)
            alarmExtra.appendChild(delBtn);
            alarmContent.prepend(alarmBox);
        });
    }

    if (act.toLowerCase() === 'edit') {
        if (editingAlarm !== -1) {
            alarms[editingAlarm].name = document.getElementById('alarmName').value
            if (document.getElementById('alarmName').value.trim() == '') {
                return;
            }
            alarms[editingAlarm].hour = document.getElementById('alarmHour').value
            if (document.getElementById('alarmHour').value.trim() == '') {
                return;
            }
            alarms[editingAlarm].days = {
                dom: document.getElementById('aDom').checked,
                seg: document.getElementById('aSeg').checked,
                ter: document.getElementById('aTer').checked,
                qua: document.getElementById('aQua').checked,
                qui: document.getElementById('aQui').checked,
                sex: document.getElementById('aSex').checked,
                sáb: document.getElementById('aSab').checked
            }

            localStorage.setItem('alarms', JSON.stringify(alarms));

            alarmManager('load')
            editingAlarm = -1
            closePopup()
        }
    }

    if (act.toLowerCase() === 'format') {
        alarms = [];
        localStorage.setItem('alarms', []);
        document.getElementById('alarmContent').innerHTML = '';
    }
}