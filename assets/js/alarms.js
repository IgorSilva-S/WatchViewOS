let playingAlarm = false

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
