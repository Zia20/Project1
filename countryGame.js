const listOfCountries = require('./listOfCountries');
const { playerInfo, state } = require('./playerInfo');

//capitalize first letter function
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

//lower case listOfCountries array
const countryList = listOfCountries.countryList.map(c => c.toLowerCase());

const welcomeGame = (req, res) => {
    message = `<h1 style="text-align:center;">Welcome to the game!!! <h1>
    <h2 style="text-align:center; color: green;"> Do you want to play a secret game or quit? </h2><br/>
    <form style="text-align:center;" method="GET" action="/startGame">
    <a id="link"><button>Play</button></a></form>
    <form style="text-align:center;" method="GET" action="/quit">
    <a id="link"><button>Quit</button></a></form>`;
      res.send(message)
  };

const handleGame = (req, res) => {
    res.send(`<html>
    <body>
        Please enter as many country names as you can, one per line:
        <form method="POST" action="/countryGame/guesses">
            <textarea rows="20" cols="40" placeholder="Type here, one per line..." name="guesses"></textarea>
            <button type="submit">That's all I can think of!</button>
        </form>
    </body>
    </html>`);
};

const handleGuesses = (req, res) => {
    const {guesses} = req.body;
    const guessedCountries = guesses.split('\n').map(g => g.trim().toLowerCase()).filter(g => !!g);
    const total = guessedCountries.length;
    console.log(guessedCountries);

    const correctCountries = countryList.filter(countryName => {
        compareCountryLists = !!guessedCountries.find(guessedName => countryName === guessedName);
        return compareCountryLists;
    });

    const numRight = correctCountries.length;
    const numWrong = total - numRight;
    const missed = countryList.length - numRight;

    //create a list
    const playerList = guessedCountries.map((country) =>
   `<li>
        ${capitalize(country)}
    </li>`).join("")

    console.log('playerList: ' + playerList)

    //create a correct list
    const compareLists = correctCountries.map((checkList) =>
   `<li>
        ${capitalize(checkList)}
    </li>`).join("")

    console.log('compareLists: ' + compareLists)

    // const incorrectCountriesList = countryList.map(checkName => {
    //     incorrectCountry = guessedCountries.map(listName => checkName !== listName)
    //     return incorrectCountry;
    // });

    //wrong country, the different between the playlist and compareList
    let incorrectCountry = guessedCountries.filter(x => !correctCountries.includes(x));
    console.log("incorrectCountry " + incorrectCountry)

    const incorrectList = incorrectCountry.map((checkList2) =>
        `<li>
            ${capitalize(checkList2)}
        </li>`).join("")
 
    console.log('incorrectList : ' + incorrectList)

    res.send(`<html>
    <body><h3>
        Sweet, you got <font style="color:green">${numRight} </font> right and <font style="color:red">${numWrong}</font> wrong.<br/> 
        By the way there are another <font style="color:blue">${missed}</font> <i>countries.</i><br/>
        These include 55 dependencies, Antarctica and other areas that should always be consided.</h3><br/>
        <h4 style="color:Blue">${state.name} Results: </h4>
        <h4>You guessed the following countries: </h4>
        <ol>${playerList}</ol><br/>
        <h4>Correct:<font style="color:green">${numRight} </font> </h4>
        <ol>${compareLists}</ol><br/>
        <h4>Incorrect:<font style="color:red">${numWrong}</font></h4>
        <ol>${incorrectList}</ol><br/>
        <form method="GET" action="/countryGame">
            <button type="submit">Play Again</button>
        </form>
        <form method="GET" action="/endGame">
            <button type="submit">End Game</button>
        </form>
    </body>
    </html>`);
    };

const endGame = (req, res) => {
    //create a list
    const countriesList = countryList.map((itemList) =>
    `<li>
        ${capitalize(itemList)}
    </li>`).join("")
    res.send(`<html>
    <body><h3>
        Thank you for playing! Here is the list of countries you can review:</h3>
        <ol>${countriesList}</ol><br/>
    </body>
    </html>`);
};

module.exports = {
    welcomeGame,
    handleGame,
    handleGuesses,
    endGame,
};