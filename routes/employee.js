const express = require("express");
const employeeController = require("../controllers/employeeController");
const employeeRouter = express.Router();

//YOUR CODE HERE

employeeRouter.get("/statistical", employeeController.statistical)
employeeRouter.post("/editStatus/:slug", employeeController.editOrder)
employeeRouter.get("/delete/:id", employeeController.deleteOrder)
employeeRouter.get("/confirm/:id", employeeController.confirmOrder)
employeeRouter.get("/", employeeController.employee);
//END

module.exports = employeeRouter;
