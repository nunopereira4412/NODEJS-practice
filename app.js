// const rootDir     = require('./util/path');
const path            = require('path');
const express         = require('express');
const bodyParser      = require('body-parser');
const adminRoutes     = require('./routes/admin');
const shopRoutes      = require('./routes/shop');
const errorController = require('./controllers/error');
const mongoose        = require('mongoose');

const User            = require('./models/user');

const app = express();

app.set('view engine', 'pug');
// the default setting for 'views' is already process.cwd() + '/views'
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

// will parse our req body and only looks at requests where the Content-type header matches the type opt
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    User.getUserById('604e48ae5f31add85d215b3d')
        .then(user => {
            console.log(user);
            req.user = new User(user._id, user.name, user.email, user.cart);
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes.routes);
app.use('/', shopRoutes.routes); 

app.use(errorController.get404);

mongoose
    .connect(
        'mongodb://127.0.0.1:27017/shop?compclientsors=disabled&gssapiServiceName=mongodb', 
        {useUnifiedTopology: true}
    )
    .then(res => app.listen(4000))
    .catch(err => console.log(err));


