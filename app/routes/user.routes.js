const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const product = require("../controllers/product.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.post("/api/createproduct", product.create);
  app.get("/api/listproductsupplier", product.listProductSupplier);
  app.get("/api/listproductclient", product.listProductClient);
  app.delete("/api/product", product.delete);
  app.put("/api/productinventory", product.updateinventory);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
