const path        = require('path');
const express     = require('express');
const bodyParser  = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes  = require('./routes/shop');
const rootDir     = require('./util/path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// app.set('view engine', 'pug');
// app.set('views', './views');

// will parse our req body and only looks at requests where the Content-type header matches the type opt
app.use(bodyParser.urlencoded({extended: false}));

app.use("/admin", adminRoutes); 
app.use(shopRoutes); 

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, "views", "404.html")); 
}); 

app.listen(4000);