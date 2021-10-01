const express = require('express');
const app = express();
const pokemon = require('./models/pokemon');
const methodOverride = require('method-override');



// Parse Request Bodies if Content-Type Header is: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// serve files statically from the public folder
app.use(express.static("public"));
app.use(methodOverride('_method'));

// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {allPokemon: pokemon});
    });

    //New route
    app.get("/pokemon/new", (req,res) => {
        res.render("new.ejs")
        
    });

  //CREATE
app.post("/pokemon", (req, res) => {
    //not sure if this the way its supposed to be done. but it's the only way i can get this to post all info to show route.
    const addPokemon = {
        name: req.body.name,
        type: req.body.type,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense:req.body.spdefense,
            speed: req.body.speed
        }
    }
    pokemon.push(addPokemon);
    res.redirect("/pokemon");
    console.log(req.body)
})

//delete route
app.delete("/pokemon/:indexOfPokemonArray", (req,res) => {
    pokemon.splice(req.params.indexOfPokemonArray, 1);
    res.redirect("/pokemon")
})

//edit route
app.get("/pokemon/:indexOfPokemonArray/edit", (req,res) =>  {
    res.render("edit.ejs", {
        pokemons: pokemon[req.params.indexOfPokemonArray],
        index: req.params.indexOfPokemonArray
    });
});
    
//update route
app.put("/pokemon/:indexOfPokemonArray", (req,res) => {
    const editPokemon = {
        name: req.body.name,
        type: req.body.type,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense:req.body.spdefense,
            speed: req.body.speed
        } 
    }
    pokemon[req.params.indexOfPokemonArray] = editPokemon
    res.redirect("/pokemon")

})
    
    // SHOW
// SHOW ROUTES - GETS ONE FRUIT
app.get("/pokemon/:indexOfPokemonArray", (req, res) => {
    console.log(req.params.id)
    res.render("show.ejs", {pokemons: pokemon[req.params.indexOfPokemonArray]});
  });
    
app.listen(3000, () => {
    console.log("app is listening on port 3000")
})    

