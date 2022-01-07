const express = require('express');
const paymentController = require("../controllers/paymentController");
const PaymentRoute = express.Router();


//YOUR CODE HERE
PaymentRoute.get('/', paymentController.index, function (req, res) {
    req.session.status = null;
});
PaymentRoute.post('/', LoginRouteProtect = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('back');
    }
    next();

}, paymentController.Order);
//END


module.exports = PaymentRoute;