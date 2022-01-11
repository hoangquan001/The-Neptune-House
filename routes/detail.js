const express = require('express');
const detailController = require("../controllers/detailController");
const detailRoute = express.Router();


//YOUR CODE HERE

detailRoute.post('/:slug/comment/:id', detailController.commentBox);
detailRoute.get('/:slug', detailController.productDetai);

//END


module.exports = detailRoute;