const router = require("express").Router(),
  scrapController = require("../controllers/scrapController");

router.get("/:memberId", scrapController.mapscrap);

module.exports = router;
