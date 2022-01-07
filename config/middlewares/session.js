

const session = require('express-session')
module.exports = app => {
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },

  }))

  app.use(function (req, res, next) {

    if (!req.session.cart) {
      req.session.cart = {
        TongSoLuongSp: 0,
        items: [
        ],

      };
    }
    res.locals.user = req.session.user;
    res.locals.role = req.session.role;
    res.locals.cart = req.session.cart;


    next();
  });
}