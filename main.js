//All the gameData and stuff that changes
var gameData = {
    money: 0,
    spinTime: 250
}

//Updates the money on load based on the save file
function updateMoney() {
    document.getElementById("money").innerHTML = "Money: " + gameData.money;
}

//Array of all the symbols
const symbols = [
    {
        name: "moneyBag",
        icon: "💰",
        image: 'images/icons/money-bag.png',
        chance: 10,
        value: 5
    },    
    {
        name: "cash",
        icon: "💵",
        image: 'images/icons/cash.png',
        chance: 30,
        value: 1
    },
    {
        name: "fail",
        icon: "✖️",
        image: 'images/icons/fail.png',
        chance: 0,
        value: 0
    }
]

//Gives ✖️ a chance value of 100-sum of the rest of the chances
symbols[symbols.length - 1].chance = 100 - (symbols[0].chance + symbols[1].chance);

// Calculate the cumulative chances
let totalChance = 0;
symbols.forEach((symbol) => {
    totalChance += symbol.chance;
    symbol.cumulativeChance = totalChance;
});

//Gets the HTML element
function getElement(id) {
    return document.getElementById(id);
}


// Function to randomize the slot machine box
function getRandomSymbol() {
    const randomNumber = Math.floor(Math.random() * 101); // Generate a random number between 0 and 100
    let selectedSymbol = symbols[0]; // Default to the first symbol

    // Determine which symbol the random number corresponds to based on cumulative chances
    for (let i = 0; i < symbols.length; i++) {
        if (randomNumber <= symbols[i].cumulativeChance) {
            selectedSymbol = symbols[i];
            break;
        }
    }

    return selectedSymbol;
}

//Spins the slot machine
function spin() {
    gameData.spinTime = 250;
    //Disables the button until spinning is over
    getElement("spinButton").disabled = true;
    
    //Gets the box elements
    const box1 = getElement('box1-img');
    const box2 = getElement('box2-img');
    const box3 = getElement('box3-img');

    //Resets the results to ❓
    box1.src = 'images/icons/default.png';
    box2.src = 'images/icons/default.png';
    box3.src = 'images/icons/default.png';

    //Generates three random symbols for each box
    const boxResults = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]

    //setTimeout delays each subsequent slot door to emulate a slot machine
    setTimeout(function(){
        box1.src = boxResults[0].image;
    }, gameData.spinTime);
    console.log(gameData);
    setTimeout(function(){
        box2.src = boxResults[1].image;
    }, gameData.spinTime*3); 
    setTimeout(function(){
        box3.src = boxResults[2].image;
        getElement("spinButton").disabled = false;
    }, gameData.spinTime*5); 

    //Gives money based on results of the spin
    setTimeout(function(){
        for (let i = 0; i < 3; i++ ) {
            gameData.money += boxResults[i].value; 
        }
        getElement("money").innerHTML = "Money: " + gameData.money;
    }, 1250); 

    //Gets the plusValue HTML element 
    const plusValueElements = [getElement('plusValue1'), getElement('plusValue2'), getElement('plusValue3')]

    //Generates the appropriate plusValues and displays them
    setTimeout(function(){
        for (let i = 0; i < 3; i++ ) {
            if (boxResults[i].value != 0) {
                plusValueElements[i].innerHTML = '+' + boxResults[i].value; // Show the plusValue div
                plusValueElements[i].style.opacity = '1'; // Show the plusValue div
                plusValueElements[i].style.animation = 'moveUpwards 1.2s'; // Apply the moveUpwards animation
                setTimeout(() => {
                    plusValueElements[i].style.opacity = '0'; // Hide the plusValue div after 2 seconds
                    plusValueElements[i].style.animation = 'none'; // Remove the animation
                }, 1100); // Adjust the time (in milliseconds) for how long the plusValue should be visible
            }
        }
    }, 1250); 
}

//Saves game in a JSON
var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("ludomaniaSave", JSON.stringify(gameData))
}, 15000)

//Loads game from a JSON
var saveGame = JSON.parse(localStorage.getItem("ludomaniaSave"))
if (saveGame !== null) {
  gameData = saveGame
}

function deleteSave() {
    localStorage.removeItem("ludomaniaSave");
}
