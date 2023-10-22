const { blogController } = require("../controller");

const routes = require("express").Router();

routes.post("/create", blogController.create);
routes.get("/", blogController.findAll);
routes.get("/:id", blogController.find);
routes.put("/:id", blogController.update);
routes.delete("/:id", blogController.remove);

module.exports = routes;
