const path        = require('path');
const express     = require('express');
const bodyParser  = require('body-parser');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir     = require('./util/path');

const app = express();

app.set('view engine', 'pug');
// the default setting for 'views' is already process.cwd() + '/views'
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

// will parse our req body and only looks at requests where the Content-type header matches the type opt
app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminData.routes);
app.use(shopRoutes); 

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: "Page not Found"}); 
}); 

app.listen(4000);

