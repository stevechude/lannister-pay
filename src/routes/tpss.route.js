const {
  lanTransaction,
  getAllTransactions,
} = require("../controllers/tpss.controller");
const router = require("express").Router();

router.post("/api/split-payments/compute", lanTransaction);

router.get("/api/split-payments/compute", getAllTransactions);

module.exports = router;
