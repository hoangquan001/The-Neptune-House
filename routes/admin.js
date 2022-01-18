const express = require("express");
const adminController = require("../controllers/adminController");
const adminRouter = express.Router();

//YOUR CODE HERE

adminRouter.get("/staff/delete/:id", adminController.deleteStaff)
adminRouter.post("/staff/edit/:id", adminController.editStaff)
adminRouter.get("/staff/search", adminController.searchStaff);
adminRouter.get("/staff", adminController.staff);
adminRouter.post("/staff", adminController.addStaff)


//YOUR CODE HERE
adminRouter.get("/product/delete/:id", adminController.deletepro);
adminRouter.post("/product/edit/:id", adminController.editPro);
adminRouter.get("/product/search", adminController.searchPro);
adminRouter.post("/product", adminController.addpro);
adminRouter.get("/product", adminController.products);
adminRouter.get("/", adminController.admin);

//END

//END

module.exports = adminRouter;
