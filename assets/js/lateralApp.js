function openLateralApp(app) {
    app.classList.remove('divideInTwo_L')
    app.classList.remove('divideInTwo_R')
    let insideName = convertIdToInsideName(app.id)
    lateralApp.style.opacity = '0'
    setTimeout(() => {
        lateralApp.removeAttribute('style')
        lateralApp.classList.remove('divideInTwo_L')
        lateralApp.classList.remove('divideInTwo_R')
        if (app == appList['watch']) {
            watchApp.removeAttribute('style')
        } else {
            app.style.display = 'block'
        }
        if (openSecondAppIn == 'left') {
            app.classList.add('divideInTwo_L')
            appInLeft = insideName
        } else if (openSecondAppIn == 'right') {
            app.classList.add('divideInTwo_R')
            appInRight = insideName
        }
    }, 700);
}

document.getElementById('lateralWatchOpen').addEventListener('click', () => {
    openLateralApp(appList['watch'])
})

document.getElementById('lateralAlarmsOpen').addEventListener('click', () => {
    openLateralApp(appList['alarm'])
})

document.getElementById('lateralSettingsOpen').addEventListener('click', () => {
    openLateralApp(appList['settings'])
})