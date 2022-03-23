const state = {
    name: undefined,
    age: undefined,
    motherland: undefined,
};

const handleContact = (req, res) => {
    const { name, age } = req.query;
    state.name = name;
    state.age = age;
    res.send(`<html>
    <body><h3>What country are you from?</h3>
     <form method="GET" action="/country">
        Country: <input type="text" name="motherland" required/><br/>
        <button type="submit">Submit</button>
    </form>
    </body>
    </html>`);
};

const handleCountry = (req, res) => {
    const { motherland } = req.query;
    state.motherland = motherland;
    console.log('!!!', motherland);
    res.send(`<html>
    <body>
        <h4>Thanks ${state.name}, ${state.age} from ${state.motherland}! <br/>
        Are you ready to list as many countries as you can?</h4><br/>
        <form method="GET" action="/countryGame">
            <button type="submit">Yes</button>
        </form>
        <form method="GET" action="/quit">
            <button type="submit">No</button>
        </form>
    </body>
    </html>`);
};

module.exports = {
    handleContact,
    handleCountry,
    state,
};
