const express = require("express");

const router = express.Router();

const hotelController = require("../controllers/hotel");

router.get("/hotels", hotelController.getHotels);

router.post("/search", hotelController.postSearch);

router.post("/room", hotelController.postRoom);

module.exports = router;
