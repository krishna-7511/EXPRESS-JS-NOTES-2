// Templateing

const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.get("/home", (req, res) => {
    res.send("Hello");
})

// app.get("/ig/:username", (req, res) => {
//     const followers = ["adam", "bob", "stive", "peter", "mike", "eve"];
//     let { username } = req.params;
//     res.render("instagram.ejs", {username, followers});
// })

// cookie signed
app.get("/getsigned",(req,res)=>{
    res.cookie("made-in","India",{signed: true});
    res.send("signed cookie sent");
});

// verification of cookies --> that wa signed 
app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verfied");
})

// cookies part
app.get("/getcookies",(req,res)=>{
    res.cookie("greet","hello");
    res.cookie("made in India","Bharat");
    console.log(req.cookies);
    res.send("sent you some cookies");
});

app.get("/greet",(req,res)=>{
    let {name = "anonymous"} = req.cookies;
    res.send(`Hello, ${name}`);
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
}); 

// Interpolation Syntax
// EJS Tags

// Passing data EJS
app.get("/rolldice", (req, res) => {
    let diceVal = Math.floor(Math.random() * 6) + 1;
    // res.render("rolldice.ejs", { num : diceVal });
    res.render("rolldice.ejs", { diceVal });
})


// Instagram EJS
// app.get("/ig/:username",(req,res)=>{
//     const followers = ["adam","prajwal","keshav","manish"];
//     const instaData = require("./data.json");
//     console.log(instaData);
//     let {username} = req.params;
//     res.render("instagram.ejs",{username, followers});
// });

// Conditional Statement
// <% %> tag

// Instagram EJS by json file
app.get("/ig/:username",(req,res)=>{
    let {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data == undefined){
        res.render("error"); 
    }
    else{
    // console.log(data);
    res.render("instagram_EJS.ejs",{data,username});
    }
});

// Serving Static files
// app.use(exprees.static("public"));
app.use(exprees.static(path.join(__dirname,"public/css")));