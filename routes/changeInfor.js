const express = require('express');
const ChangeInforController = require("../controllers/profileController");
const changeInforRoute = express.Router();


//YOUR CODE HERE
changeInforRoute.get('/:id', ChangeInforController.inforUser);
changeInforRoute.post('/edit/:id', ChangeInforController.editInfo);
//END


module.exports = changeInforRoute;  