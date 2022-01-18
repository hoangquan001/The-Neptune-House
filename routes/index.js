//YOUR CODE HERE
const HomeRouter = require('./home')
const paymentRoute = require('./payment')
const detailRoute = require('./detail')
const adminRouter = require('./admin')
const employeeRouter = require("./employee")
const signupRouter = require('./signup')
const changeInforRouter = require('./changeInfor')


//middleware
AdminRouteProtect = function (req, res, next) {
    if (req.session.role === 'admin') {
        next();
    } else {
        res.render('notfound404', { layout: './layouts/staff', title: 'Not Found' })
    }
}
EnployeeRouteProtect = function (req, res, next) {
    if (req.session.role === 'staff') {
        next();
    } else {
        res.render('notfound404', { layout: './layouts/staff', title: 'Not Found' })
    }
}


function route(app) {
    //YOUR CODE HERE
    app.use('/profile', changeInforRouter)
    app.use('/detail', detailRoute)
    app.use('/payment', paymentRoute)
    app.use('/admin', adminRouter)
    app.use('/employee', employeeRouter)
    app.use('/signup', signupRouter)
    app.use('/', HomeRouter)

    //ENd CODE
    // error handler

    app.use(function (req, res) {
        res.render('notfound404', { layout: './layouts/staff', title: 'Not Found' })
    });


}
module.exports = route;