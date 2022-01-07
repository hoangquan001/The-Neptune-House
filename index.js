const express = require('express')
var expressLayouts = require('express-ejs-layouts');
const path = require('path');
var ejs = require('ejs');
const mongodb = require('./config/database')
const route = require('./routes/index');
const app = express()
const multer = require("multer");
const fs = require("fs");
const port = 8888
require('./config/middlewares/session')(app);

//DataBase connect
mongodb.connect()


// const tkad = require('./models/TaiKhoan_Admin');

// const newad = new tkad({ TenDangNhap: 'admin', MatKhau: '$2a$12$oVwoit5ssp.nqftqqmVu3OXWJs3hM86w8XiIwuklHkAkRH9qqw3yi' })
// newad.save()
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
app.set('view engine', 'ejs')
app.set('layout', './layouts/main')
require('./config/middlewares/passport')(app);


//Code to start server

//route
require('./config/middlewares/upload')(app);


route(app)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})