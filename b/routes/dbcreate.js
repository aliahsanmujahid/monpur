const express = require("express");

const {
  createuser,
  createproduct,
  imagewatch,
  chat,
  chatwatch,
  message,
  orders,
  orderitems,
  otpcheck,
  vari1,
  vari2,
  vari1values,
  vari2values,
  mixedvari,
  mixvalues,
  cate,
  subcate,
  reviews,
  paymentsetting,
  coupon,
  slider,
  footer,
  terms,
  shiping

} = require("../controllers/dbcreate");

const router = express.Router();

router.get("/createuser", createuser);
router.get("/createproduct", createproduct);
router.get("/imagewatch", imagewatch);
router.get("/chat", chat);
router.get("/message", message);
router.get("/chatwatch", chatwatch);
router.get("/orders", orders);
router.get("/orderitems", orderitems);
router.get("/otpcheck", otpcheck);

router.get("/vari1", vari1);
router.get("/vari2", vari2);
router.get("/vari1values", vari1values);
router.get("/vari2values", vari2values);

router.get("/mixedvari", mixedvari);
router.get("/mixvalues", mixvalues);

router.get("/cate", cate);
router.get("/subcate", subcate);
router.get("/reviews", reviews);
router.get("/paymentsetting", paymentsetting);
router.get("/coupon", coupon);
router.get("/slider", slider);

router.get("/footer", footer);
router.get("/terms", terms);
router.get("/shiping", shiping);




module.exports = router;
