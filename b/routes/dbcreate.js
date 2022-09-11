const express = require("express");

const {
  createuser,
  createproduct,
  imagewatch,
  chat,
  message

} = require("../controllers/dbcreate");

const router = express.Router();

router.get("/createuser", createuser);
router.get("/createproduct", createproduct);
router.get("/imagewatch", imagewatch);
router.get("/chat", chat);
router.get("/message", message);



module.exports = router;
