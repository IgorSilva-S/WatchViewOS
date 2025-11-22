function wiiUSounds() {
    document.getElementById("openHome").src = "assets/sounds/WiiU/HomeUp.mp3";
    document.getElementById("closeHome").src = "assets/sounds/WiiU/HomeClose.mp3";
    document.getElementById("hover").src = "assets/sounds/WiiU/HoverBtn.wav";
    document.getElementById("openApp").src = "assets/sounds/WiiU/OpenApp.wav";
    document.getElementById("clickbtn").src = "assets/sounds/WiiU/ClickBtn.wav";
    document.getElementById("clicklink").src = "assets/sounds/WiiU/LinkOpen.wav";
    document.getElementById("clickcb").src = "assets/sounds/WiiU/ClickCB.wav";
    document.getElementById("backsound").src = "assets/sounds/WiiU/Back.wav";
    document.getElementById("loadingAudio").src = "assets/sounds/WiiU/Loading.wav";
}

function switchSounds() {
    document.getElementById("openHome").src = "assets/sounds/Switch/HomeUp.wav";
    document.getElementById("closeHome").src = "assets/sounds/Switch/HomeClose.wav";
    document.getElementById("hover").src = "assets/sounds/Switch/HoverBtn.wav";
    document.getElementById("openApp").src = "assets/sounds/Switch/OpenApp.wav";
    document.getElementById("clickbtn").src = "assets/sounds/Switch/ClickBtn.wav";
    document.getElementById("clicklink").src = "assets/sounds/Switch/LinkOpen.wav";
    document.getElementById("clickcb").src = "assets/sounds/Switch/ClickCB.wav";
    document.getElementById("backsound").src = "assets/sounds/Switch/Back.wav";
    document.getElementById("loadingAudio").src = "assets/sounds/Switch/Loading.wav";
}

function eShopSounds() {
    document.getElementById("openHome").src = "assets/sounds/FAeShop/HomeUp.wav";
    document.getElementById("closeHome").src = "assets/sounds/FAeShop/HomeClose.wav";
    document.getElementById("hover").src = "assets/sounds/FAeShop/HoverBtn.wav";
    document.getElementById("openApp").src = "assets/sounds/FAeShop/OpenApp.wav";
    document.getElementById("clickbtn").src = "assets/sounds/FAeShop/ClickBtn.wav";
    document.getElementById("clicklink").src = "assets/sounds/FAeShop/LinkOpen.wav";
    document.getElementById("clickcb").src = "assets/sounds/FAeShop/ClickCB.wav";
    document.getElementById("backsound").src = "assets/sounds/FAeShop/Back.wav";
    document.getElementById("loadingAudio").src = "assets/sounds/FAeShop/Loading.wav";
}

function DS3Sounds() {
    document.getElementById("openHome").src = "assets/sounds/3DS/HomeUp.wav";
    document.getElementById("closeHome").src = "assets/sounds/3DS/HomeClose.wav";
    document.getElementById("hover").src = "assets/sounds/3DS/HoverBtn.wav";
    document.getElementById("openApp").src = "assets/sounds/3DS/OpenApp.wav";
    document.getElementById("clickbtn").src = "assets/sounds/3DS/ClickBtn.wav";
    document.getElementById("clicklink").src = "assets/sounds/3DS/LinkOpen.wav";
    document.getElementById("clickcb").src = "assets/sounds/3DS/ClickCB.wav";
    document.getElementById("backsound").src = "assets/sounds/3DS/Back.wav";
    document.getElementById("loadingAudio").src = "assets/sounds/3DS/Loading.wav";
}

function steamSounds() {
    document.getElementById("openHome").src = "assets/sounds/SDeck/HomeUp.wav";
    document.getElementById("closeHome").src = "assets/sounds/SDeck/HomeClose.wav";
    document.getElementById("hover").src = "assets/sounds/SDeck/HoverBtn.wav";
    document.getElementById("openApp").src = "assets/sounds/SDeck/OpenApp.wav";
    document.getElementById("clickbtn").src = "assets/sounds/SDeck/ClickBtn.wav";
    document.getElementById("clicklink").src = "assets/sounds/SDeck/LinkOpen.wav";
    document.getElementById("clickcb").src = "assets/sounds/SDeck/ClickCB.wav";
    document.getElementById("backsound").src = "assets/sounds/SDeck/Back.wav";
    document.getElementById("loadingAudio").src = "assets/sounds/SDeck/Loading.wav";
}

document.getElementById('soundChanger').addEventListener('change', () => {
    let opt = document.getElementById('soundChanger').value
    opt == 'wiiu' ? wiiUSounds() : opt == 'switch' ? switchSounds() : opt == 'eshop' ? eShopSounds() : opt == '3DS' ? DS3Sounds() : opt == 'steamDeck' ? steamSounds() : wiiUSounds()
})