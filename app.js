const express = require("express");
const app = express();
const fetch = require('node-fetch');
const bodyParser = require("body-parser");

//=================
// SETTINGS
//=================

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

//====================


//=================
// FUNCTIONS
//=================

async function callApi (movie){
    try{
        let response = await fetch(`http://www.omdbapi.com/?apikey=thewdb&s=${movie}`);
        let data = await response.json()

        if(data.Error){
            if(data.Error == "Movie not found!"){
                return ("Movie not found!");
            }
            else{
                return("Too many results be more especific please!!");
            }
        }
        else{
            return data.Search;
        }

    }
    catch{
        return ("Error fetching API");
    }
  
}

//====================



//=================
// ROUTES
//=================

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/results", async(req,res)=>{
    let movie = req.query.movie;
    let results = await callApi(movie);  
    res.render("results", {results:results});
})


app.get("*", (req,res)=>{
    res.send("404");
})

//====================

app.listen(process.env.PORT || 3000, ()=> console.log("App up!! port 3000"))


// by Hugo Moncada