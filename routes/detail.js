const express = require('express');
const detailController = require("../controllers/detailController");
const detailRoute = express.Router();


//YOUR CODE HERE

detailRoute.post('/:slug/comment/:id', detailController.commentBox);
detailRoute.get('/:slug', detailController.productDetai);
// detailRoute.get('/', detailController.index);
//END


module.exports = detailRoute;