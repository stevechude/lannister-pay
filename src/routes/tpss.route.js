const lanTransaction = require('../controllers/tpss.controller');
const router = require('express').Router();


router.post("/api/split-payments/compute", lanTransaction);

module.exports = router;