const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const product = require("../controllers/product.controller");
const brand = require("../controllers/brands.controller");
const category = require("../controllers/category.controller");
const subcategory = require("../controllers/subCategory.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.post("/api/createbrand", brand.createBrands);
  app.put("/api/updatebrand/:id", brand.updateBrands);
  app.post("/api/getallbrand", brand.getBrands);
  app.delete("/api/deletebrand/:id", brand.deleteBrand);

  app.get("/api/listproductsupplier", product.listProductSupplier);
  app.get("/api/listproductclient", product.listProductClient);

  app.post("/api/createproduct", product.create);
  app.delete("/api/product/:id", product.delete);
  // app.put("/api/updateproduct/:id", product.updateProduct);
  app.put("/api/productinventory/:id", product.updateinventory);

  app.post("/api/createcategory", category.createCategory);
  app.put("/api/updatecategory/:id", category.updateCategory);
  app.post("/api/getallcategory", category.getCategory);
  app.delete("/api/deletecategory/:id", category.deleteCategory);

  app.post("/api/createsubcategory", subcategory.createSubCategory);
  app.put("/api/updatesubcategory/:id", subcategory.updateSubCategory);
  app.post("/api/getallsubcategory", subcategory.getSubCategory);
  app.delete("/api/deletesubcategory/:id", subcategory.deleteSubCategory);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

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

  app.get("/api/test", [authJwt.verifyToken], controller.userBoard);
};
