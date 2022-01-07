const express = require('express');
const SignupController = require("../controllers/SignupController");
const SigupRouter = express.Router();


//YOUR CODE HERE
// Thịnh làm
SigupRouter.get('/', SignupController.index);
SigupRouter.get('/:id', SignupController.getVerifyEmail);
SigupRouter.post('/', SignupController.Signup);
// SigupRouter.get("/verify-email", authController.getVerifyEmail);
// SigupRouter.post("/verify-email", authController.postVerifyEmail);
//END


module.exports = SigupRouter; 