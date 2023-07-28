//All the gameData and stuff that changes
var gameData = {
    money: 1
}

//Array of all the symbols
const symbols = [
    symbol1 = "✖️",
    symbol2 = "💵",
    symbol3 = "💰"

    /*
    symbol1 = {
        name: "fail",
        icon: "✖️",
        chance: 100-(symbol2.chance+symbol3.chance)
    },
    symbol2 = {
        name: "fail",
        icon: "💵",
        chance: 40
    },
    symbol1 = {
        name: "fail",
        icon: "💰",
        chance: 10
    }
    */
]

//Get a random number between 0 and 2
function getRandomNumber() {
    return Math.floor(Math.random() * 3);
}

//Gets the HTML element
function getElement(id) {
    return document.getElementById(id);
}

//Spins the slot machine
function spin() {
    //Disables the button until spinning is over
    document.getElementById("spinButton").disabled = true;
    
    //Gets the box elements
    const box1 = getElement('box1');
    const box2 = getElement('box2');
    const box3 = getElement('box3');

    //Resets the results to ❓
    box1.innerHTML = `❓`;
    box2.innerHTML = `❓`;
    box3.innerHTML = `❓`;

    //Gets random numbers
    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    const num3 = getRandomNumber();

    //setTimeout delays each subsequent slot door to emulate a slot machine
    setTimeout(function(){
        box1.innerHTML = `${symbols[num1]}`;
    }, 250);
    setTimeout(function(){
        box2.innerHTML = `${symbols[num2]}`;
    }, 750); 
    setTimeout(function(){
        box3.innerHTML = `${symbols[num3]}`;
        document.getElementById("spinButton").disabled = false;
    }, 1250); 

    //Gives money based on results of the spin
    setTimeout(function(){
        
        document.getElementById("money").innerHTML = "Money: " + gameData.money;
    }, 1250); 
}

//Saves game in a JSON
var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("ludomaniaSave", JSON.stringify(gameData))
}, 15000)

//Loads game from a JSON
var savegame = JSON.parse(localStorage.getItem("ludomaniaSave"))
if (savegame !== null) {
  gameData = savegame
}