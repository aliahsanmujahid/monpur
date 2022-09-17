const express = require("express");

const {
  createuser,
  createproduct,
  imagewatch,
  chat,
  message,
  orders,
  orderitems,
  otpcheck,
  sizes,
  colors
  

} = require("../controllers/dbcreate");

const router = express.Router();

router.get("/createuser", createuser);
router.get("/createproduct", createproduct);
router.get("/imagewatch", imagewatch);
router.get("/chat", chat);
router.get("/message", message);
router.get("/orders", orders);
router.get("/orderitems", orderitems);
router.get("/otpcheck", otpcheck);

router.get("/sizes", sizes);
router.get("/colors", colors);



module.exports = router;
