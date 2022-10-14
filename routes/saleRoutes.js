const express = require("express");
const {
  getSales,
  postSale,
  getSale,
  deleteSale,
} = require("../controllers/saleController");
const authFunction = require("../middleware/authFunction");
const upload = require("../middleware/fileUpload");

const router = express.Router();

// using middleware
router.use(authFunction);

// get all sales
router.get("/", getSales);

// post a sale
router.post("/", upload.array("img"), postSale);

// get a single sale
router.get("/:id", getSale);

// delete a sale
router.delete("/:id", deleteSale);

module.exports = router;
