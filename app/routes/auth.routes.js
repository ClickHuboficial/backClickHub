const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const supplier = require("../controllers/supplier.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup", controller.signup
  );

  // app.post("/send", supplier.teste);

  app.post("/api/auth/signin", controller.signin);
  app.post(
    "/api/auth/signups", supplier.signup
  );
  app.post("/api/auth/signins", supplier.signin);
};
