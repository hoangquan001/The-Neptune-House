const express = require('express')
var expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongodb = require('./config/database')
const route = require('./routes/index');
const app = express()

require('./config/middlewares/session')(app);

//DataBase connect
mongodb.connect()

//Config
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.use(expressLayouts)
//t
app.set('view engine', 'ejs')
app.set('layout', './layouts/main')
require('./config/middlewares/passport')(app);


//Code to start server

//route
require('./config/middlewares/upload')(app);


route(app)

const port = process.env.PORT || 8888
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})