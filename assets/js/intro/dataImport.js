document.getElementById('dataImportInp').value = ''
document.getElementById('dataImportInp').addEventListener('change', f => {
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
                localStorage.setItem('initialBoot', data[7])
                localStorage.setItem('clearSetup', data[8])

                location.href = 'index.html'
            } catch (err) {
                console.log('Erro na importação: ' + err)
            }
        }

        reader.readAsText(file)
    }
})