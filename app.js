const express    = require('express');
const bodyParser = require('body-parser');

const app = express();

// will parse our req body and only looks at requests where the Content-type header matches the type opt
app.use(bodyParser.urlencoded());

app.use("/", (req, res, next) => {
    console.log("USED IN ALL PATHS"); 
    next();
});

app.use("/addProduct", (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></input></form>');  
});

app.post("/product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
}); 

app.use("/", (req, res, next) => {
    res.send("Main page");
}); 

app.listen(4000);