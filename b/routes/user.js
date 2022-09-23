const express = require("express");
const multer = require("multer");
const { v4: uuid } = require('uuid')
const { isAuth, isAdmin } = require("../middlewares/auth");

const {
  signIn,
  imageupload,
  deleteimage,
  getsellerproducts,
  createchat,
  createmessege,
  getchats,
  getmessages,
  getsellers,
  getsingleseller,
  getusers,
  getsingleuser,
  signup,
  sendotp,
  setac,
  fsendotp,
  fsetac



} = require("../controllers/user");

const {
  createproduct,
  getsingleproduct,
  updateproduct,
  getallproducts,
  getcolors,
  getsizes,
  searchproducts

} = require("../controllers/product");

const {
  createorder,
  getSellerOrders,
  getCustomerOrders
} = require("../controllers/order");

const {
  getcategoryes,
  createcate,
  createsubcate,
  getallsubcate,
  getallcate,
  getsubcatebyid

} = require("../controllers/category");

const {
  createreview,
  getallreviews

} = require("../controllers/review");



const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/webp': 'webp'
};

const storage = multer.diskStorage({
  destination(req,file,cb){
    cb(null,'images/')
  },
  filename(req,file,cb){
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, uuid() + '.' + ext);
  }
})

const upload = multer({
  storage,
  limits:{
    fileSize:1000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png|webp)$/i)){
     return cb(new Error('Invalid mime type!'))
    }
    cb(undefined,true)
  }
})


router.post("/signin", signIn);
router.post("/createproduct", 
    isAuth,
    isAdmin,
    createproduct
);
router.post("/updateproduct", 
    isAuth,
    isAdmin,
    updateproduct
);
router.post("/createorder", 
    isAuth,
    createorder
);
router.get("/getSellerOrders/:id/:page/:status", 
    isAuth,
    getSellerOrders
);
router.get("/getCustomerOrders/:id/:page/:status", 
    isAuth,
    getCustomerOrders
);

router.post("/createreview", 
    isAuth,
    createreview
);

router.get("/getallreviews/:pid", getallreviews);



router.post("/imageupload",upload.single('file'), imageupload);
router.post("/deleteimage",deleteimage);
router.get("/getallproducts",getallproducts);
router.get("/getsingleproduct/:id",getsingleproduct);
router.get("/getsellerproducts/:id",getsellerproducts);
router.get("/getcolors/:id",getcolors);
router.get("/getsizes/:id",getsizes);



router.get("/searchproducts/:text",searchproducts);



router.post("/createchat",createchat);
router.post("/createmessege",createmessege);
router.get("/getchats/:id",getchats);
router.get("/getmessages/:id",getmessages);


router.get("/getsellers",getsellers);
router.get("/getsingleseller/:id",getsingleseller);



router.get("/getusers",getusers);
router.get("/getsingleuser/:id",getsingleuser);



router.get("/getcategoryes",getcategoryes);
router.get("/getallsubcate",getallsubcate);
router.get("/getsubcatebyid/:id",getsubcatebyid);
router.get("/getallcate",getallcate);
router.post("/createcate",createcate);
router.post("/createsubcate",createsubcate);




router.post("/signup",signup);
router.post("/sendotp",sendotp);
router.post("/setac",setac);
router.post("/fsendotp",fsendotp);
router.post("/fsetac",fsetac);

module.exports = router;
