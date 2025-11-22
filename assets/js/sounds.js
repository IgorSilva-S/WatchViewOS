let buttons, checks, colorLabels, secBtns;
let isMobile = window.matchMedia("(max-height: 500px)").matches ? true : false;

// Sounds
const hoverSound = document.getElementById("hover");
const clickSound = document.getElementById("clickbtn");
const clickLinkSound = document.getElementById("clicklink");
const checkboxClickSound = document.getElementById("clickcb");
const loadingSound = document.getElementById("loadingAudio");
const backSound = document.getElementById("backsound");
const openAppSound = document.getElementById("openApp");

// ========== HANDLERS REUTILIZÁVEIS ==========
function handleHover(e) {
  let canPlaySFX = document.getElementById("sysSounds").checked;
  if (canPlaySFX && !isMobile) {
    hoverSound.currentTime = 0;
    hoverSound.play();
  }
}

function handleClick(e) {
  let canPlaySFX = document.getElementById("sysSounds").checked;
  if (canPlaySFX) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
}

function handleCheckboxClick(e) {
  let canPlaySFX = document.getElementById("sysSounds").checked;
  if (canPlaySFX) {
    checkboxClickSound.currentTime = 0;
    checkboxClickSound.play();
  }
}

function handleBack(e) {
  let canPlaySFX = document.getElementById("sysSounds").checked;
  if (canPlaySFX) {
    clickSound.pause();
    clickSound.currentTime = 0;
    backSound.currentTime = 0;
    backSound.play();
  }
}

function handleOpenApp(e) {
  let canPlaySFX = document.getElementById("sysSounds").checked;
  if (canPlaySFX) {
    clickSound.pause();
    clickSound.currentTime = 0;
    openAppSound.currentTime = 0;
    openAppSound.play();
  }
}

// ============================================

function soundManager(type) {
  if (type.toLowerCase() == "load") {
    buttons = [...document.getElementsByTagName("button")];
    checks = [...document.querySelectorAll('[type="checkbox"]')];
    colorLabels = [...document.getElementsByClassName("colorLabel")];
    secBtns = [...document.getElementsByClassName("secBtn")];

    // Botões gerais
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", handleHover);
      button.addEventListener("click", handleClick);
    });

    // Fake Button (label com carinha de botão)
    document
      .getElementById("fButton")
      .addEventListener("mouseenter", handleHover);
    document.getElementById("fButton").addEventListener("click", handleClick);

    // Checkboxes
    checks.forEach((check) => {
      check.addEventListener("mouseenter", handleHover);
      check.addEventListener("click", handleCheckboxClick);
    });

    // Cores
    colorLabels.forEach((colorLabel) => {
      colorLabel.addEventListener("mouseenter", handleHover);
      colorLabel.addEventListener("click", handleCheckboxClick);
    });

    // Botão voltar
    backBtn.addEventListener("click", handleBack);

    // Fechar pop-up
    document.getElementById("closePop").addEventListener("click", handleBack);

    // Abrir app
    Array.from(document.getElementById("abc").children).forEach((element) => {
      element.addEventListener("click", handleOpenApp);
    });
  }

  if (type.toLowerCase() == "unload") {
    // Botões gerais
    buttons.forEach((button) => {
      button.removeEventListener("mouseenter", handleHover);
      button.removeEventListener("click", handleClick);
    });

    // fButton
    document
      .getElementById("fButton")
      .removeEventListener("mouseenter", handleHover);
    document
      .getElementById("fButton")
      .removeEventListener("click", handleClick);

    // Checkboxes
    checks.forEach((check) => {
      check.removeEventListener("mouseenter", handleHover);
      check.removeEventListener("click", handleCheckboxClick);
    });

    // Labels de cor
    colorLabels.forEach((colorLabel) => {
      colorLabel.removeEventListener("mouseenter", handleHover);
      colorLabel.removeEventListener("click", handleCheckboxClick);
    });

    // Voltar
    backBtn.removeEventListener("click", handleBack);

    // Fechar pop-up
    document
      .getElementById("closePop")
      .removeEventListener("click", handleBack);

    // Abrir app
    Array.from(document.getElementById("abc").children).forEach((element) => {
      element.removeEventListener("click", handleOpenApp);
    });
  }
}

function lSound() {
  let canPlaySFX = document.getElementById("sysSounds").checked;
  if (canPlaySFX) {
    if (actualApp != "watch" && isLoadingTime && !homeMenuOpened) {
      loadingSound.play();
    } else {
      loadingSound.pause();
      loadingSound.currentTime = 0;
    }
  } else {
    loadingSound.pause();
    loadingSound.currentTime = 0;
  }
}

soundManager("load");

setInterval(() => {
  soundManager("unload");
  soundManager("load");
}, 1);
