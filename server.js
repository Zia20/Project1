const express = require('express');
const app = express();
const playerInfo = require('./playerInfo');
const countryGame = require('./countryGame');
//let WorldMap = require("world-map");

const PORT = 4004

app.use(express.urlencoded({
    extended: false
}));

app.get("/", countryGame.welcomeGame);

app.get("/startGame", (req, res) => {
    res.send(`<html>
    <body><h2>Please type your name and age.<h2>
    <form method="GET" action="/contact">
        Name: <input type="text" name="name" required/><br/>
        Age: <input type="text" name="age" required/><br/>
        <button type="submit">Submit</button>
    </form>
    </body>
    </html>`);
});

app.get('/contact', playerInfo.handleContact);
app.get('/country', playerInfo.handleCountry);

app.get('/countryGame', countryGame.handleGame);
app.post(`/countryGame/guesses`, countryGame.handleGuesses);

app.get('/quit', (req, res) =>{
    res.send(`<html>
    <body><h1> Goodbye!!! :-( Come back again!</h1>
    </body>
    </html>`);
});

app.get('/endGame', countryGame.endGame);

//app.listen(4004, () => console.log(`listening on on port ${PORT}`));

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

