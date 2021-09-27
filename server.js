const express = require('express')
const app = express()
const pokemon = require('./models/pokemon.js')


// Parse Request Bodies if Content-Type Header is: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// serve files statically from the public folder
app.use(express.static("public"));

// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {allPokemon: pokemon});
    });
    
    
    // SHOW

    
app.listen(3000, () => {
    console.log("app is listening on port 3000")
})    