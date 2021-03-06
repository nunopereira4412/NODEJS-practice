// const rootDir     = require('./util/path');
const path            = require('path');
const express         = require('express');
const bodyParser      = require('body-parser');
const adminRoutes     = require('./routes/admin');
const shopRoutes      = require('./routes/shop');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'pug');
// the default setting for 'views' is already process.cwd() + '/views'
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

// will parse our req body and only looks at requests where the Content-type header matches the type opt
app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes.routes);
app.use('/', shopRoutes.routes); 

app.use(errorController.get404);

app.listen(4000);

