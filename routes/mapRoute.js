const router = require('express').Router(),
    mapController = require('../controllers/mapController');
    
//router.get("/", mapController.map);
router.get("/:category", mapController.getStore);

module.exports = router;