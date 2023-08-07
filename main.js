//All the gameData and stuff that changes
var gameData = {
    money: 0
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
        chance: 10,
        value: 5
    },    
    {
        name: "cash",
        icon: "💵",
        chance: 30,
        value: 1
    },
    {
        name: "fail",
        icon: "✖️",
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

    //Generates three random symbols for each box
    const boxResults = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]

    //setTimeout delays each subsequent slot door to emulate a slot machine
    setTimeout(function(){
        box1.innerHTML = boxResults[0].icon;
    }, 250);
    setTimeout(function(){
        box2.innerHTML = boxResults[1].icon;
    }, 750); 
    setTimeout(function(){
        box3.innerHTML = boxResults[2].icon;
        document.getElementById("spinButton").disabled = false;
    }, 1250); 

    //Gives money based on results of the spin
    setTimeout(function(){
        for (let i = 0; i < 3; i++ ) {
            gameData.money += boxResults[i].value; 
        }
        document.getElementById("money").innerHTML = "Money: " + gameData.money;
    }, 1250); 

    //Gets the plusValue HTML element 
    const plusValueElements = [document.getElementById('plusValue1'), document.getElementById('plusValue2'), document.getElementById('plusValue3')]

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
var savegame = JSON.parse(localStorage.getItem("ludomaniaSave"))
if (savegame !== null) {
  gameData = savegame
}