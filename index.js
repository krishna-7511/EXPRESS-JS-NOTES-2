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


/*
    const express = require("express");
const cookieParser = require("cookie-parser");  // <-- added
const path = require("path");
const instaData = require("./data.json");

const app = express();
const port = 8080;

// Middleware to parse cookies with a secret key for signed cookies
app.use(cookieParser("mySecretKey"));

// Serve all static files inside "public"
app.use(express.static(path.join(__dirname, "public")));

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes

app.get("/", (req, res) => {
    res.render("home");  // omit .ejs extension
});

app.get("/home", (req, res) => {
    res.send("Hello");
});

// Only one /ig/:username route — handle Instagram logic here
app.get("/ig/:username", (req, res) => {
    const instaData = require("./data.json");
    let { username } = req.params;
    const data = instaData[username];
    if (data === undefined) {
        res.render("error");
    } else {
        res.render("instagram_EJS", { data, username });
    }
});

// Dice roll example
app.get("/rolldice", (req, res) => {
    let diceVal = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice", { diceVal });
});

// Cookie related routes

// Send signed cookie
app.get("/getsigned", (req, res) => {
    res.cookie("made-in", "India", { signed: true });
    res.send("Signed cookie sent");
});

// Verify signed cookies
app.get("/verify", (req, res) => {
    console.log(req.signedCookies);
    res.send("Verified");
});

// Send some cookies
app.get("/getcookies", (req, res) => {
    res.cookie("greet", "hello");
    res.cookie("made_in_India", "Bharat");
    console.log(req.cookies);
    res.send("Sent you some cookies");
});

// Greet based on cookie value
app.get("/greet", (req, res) => {
    let { name = "anonymous" } = req.cookies;
    res.send(`Hello, ${name}`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

 



 // Route: /rolldice
app.get("/rolldice", (req, res) => {
    const diceVal = Math.floor(Math.random() * 6) + 1;
     res.render("rolldice.ejs", { num : diceVal });
    res.render("rolldice", { diceVal }); // pass diceVal to EJS
});

// Route: /ig/:username with followers and instaData check
app.get("/ig/:username", (req, res) => {
    const followers = ["adam", "prajwal", "keshav", "manish"];
    const instaData = require("./data.json");
    console.log(instaData);
    let { username } = req.params;
    res.render("instagram.ejs", { username, followers });
});


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
 */