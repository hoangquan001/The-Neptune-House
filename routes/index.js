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
        res.redirect('back');
    }
}
EnployeeRouteProtect = function (req, res, next) {
    if (req.session.role === 'staff') {
        next();
    } else {
        res.redirect('back');
    }
}

CustomerRouteProtect = function (req, res, next) {
    if (req.session.role === 'customer') {
        next();
    } else {
        res.redirect('back');
    }
}
function route(app) {
    //YOUR CODE HERE
    app.use('/profile', changeInforRouter)
    app.use('/detail', detailRoute)
    app.use('/payment', CustomerRouteProtect, paymentRoute)
    app.use('/admin', AdminRouteProtect, adminRouter)
    app.use('/employee', EnployeeRouteProtect, employeeRouter)
    app.use('/signup', signupRouter)
    app.use('/', HomeRouter)

    //ENd CODE
    // error handler

    app.use(function (req, res) {
        res.render('notfound404', { layout: './layouts/staff', title: 'Not Found' })
    });


}
module.exports = route;