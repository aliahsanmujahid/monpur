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
  colors,
  cate,
  subcate,
  reviews
  

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


router.get("/cate", cate);
router.get("/subcate", subcate);
router.get("/reviews", reviews);



module.exports = router;
