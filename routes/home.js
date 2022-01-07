const express = require('express');
const HomeController = require("../controllers/HomeController");
const HomeRouter = express.Router();


//YOUR CODE HERE

HomeRouter.get('/search', HomeController.Search);
HomeRouter.get('/home', HomeController.index);

HomeRouter.get('/logout', HomeController.getLogout);
HomeRouter.get('/', HomeController.home);
// home
HomeRouter.post('/', HomeController.getLogin);
HomeRouter.post('/addCart', HomeController.addCart);
//END


module.exports = HomeRouter;