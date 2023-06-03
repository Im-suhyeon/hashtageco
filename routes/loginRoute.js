const router = require("express").Router(),
  homeController = require("../controllers/homeController"),
  loginController = require("../controllers/loginController");

router.get("/", homeController.login);
router.post("/", async (req, res) => {
  loginController.login(res, req);
});

module.exports = router;