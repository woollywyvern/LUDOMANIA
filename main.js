const symbols = [
    symbol1 = "✖️",
    symbol2 = "💵",
    symbol3 = "💰"
]

function getRandomNumber() {
    return Math.floor(Math.random() * 3);
}

function getElement(id) {
    return document.getElementById(id);
}

function spin() {
    const item1 = getElement('item1');
    const item2 = getElement('item2');
    const item3 = getElement('item3');

    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    const num3 = getRandomNumber();

    item1.innerHTML = `${symbols[num1]}`;
    item2.innerHTML = `${symbols[num2]}`;
    item3.innerHTML = `${symbols[num3]}`;
}

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("ludomaniaSave", JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("ludomaniaSave"))
if (savegame !== null) {
  gameData = savegame
}