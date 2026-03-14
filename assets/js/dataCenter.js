let events, todos, alarms, personalization, settings, datas, homeMenuData, fBoot;

function bootData() {
    console.log(`Booting... \nGetting Data...`);


    events = JSON.parse(localStorage.getItem('events')) || [];
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    personalization = JSON.parse(localStorage.getItem('personalization')) || {};
    settings = JSON.parse(localStorage.getItem('settings')) || {};
    datas = JSON.parse(localStorage.getItem('datas')) || {};
    homeMenuData = JSON.parse(localStorage.getItem('homeMenu')) || {};
    fBoot = localStorage.getItem('initialBoot')

    // Salva os dados no localStorage se estiverem vazios
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('alarms', JSON.stringify(alarms));
    localStorage.setItem('personalization', JSON.stringify(personalization));
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('datas', JSON.stringify(datas));
    localStorage.setItem('homeMenu', JSON.stringify(homeMenuData));
    if (fBoot === null) {
        let d = new Date
        localStorage.setItem('initialBoot', d)
        fBoot = localStorage.getItem('initialBoot')
    }

}

function dataExport() {
    const data = [
        events,
        todos,
        alarms,
        personalization,
        settings,
        datas,
        homeMenuData,
        fBoot
    ]

    const dataString = JSON.stringify(data)
    const blob = new Blob([dataString], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "WatchView.data";
    link.click();
}

document.getElementById('exportBtn').addEventListener('click', dataExport)

document.getElementById('importationData').addEventListener('change', f => {
    let file = f.target.files[0]
    console.log(file)
    if (file) {
        const reader = new FileReader()
        reader.onload = function (e)  {
            console.log(e)
            try {
                const dataString = e.target.result
                const data = JSON.parse(dataString)
                console.log(data)

                localStorage.setItem('events', JSON.stringify(data[0]))
                localStorage.setItem('todos', JSON.stringify(data[1]))
                localStorage.setItem('alarms', JSON.stringify(data[2]))
                localStorage.setItem('personalization', JSON.stringify(data[3]))
                localStorage.setItem('settings', JSON.stringify(data[4]))
                localStorage.setItem('datas', JSON.stringify(data[5]))
                localStorage.setItem('homeMenu', JSON.stringify(data[6]))
                localStorage.setItem('initialBoot', JSON.stringify(data[7]))

                location.reload()
            } catch (err) {
                console.log('Erro na importação: ' + err)
            }
        }

        reader.readAsText(file)
    }
})