const express = require("express");
const multer = require("multer");
const { v4: uuid } = require('uuid')
const { isAuth, isAdmin } = require("../middlewares/auth");

const {
  signIn,
  imageupload,
  deleteimage,
  getsellerproducts,
  getsellers,
  getsingleseller,
  getusers,
  getsingleuser,
  signup,
  sendotp,
  setac,
  fsendotp,
  fsetac,


  getaddress,
  updateaddress,
  createaddress,

  getadminmoderator,
  setadminmoderator,
  ownotp

} = require("../controllers/user");

const {
  createchat,
  createmessege,
  getchats,
  getmessages,
  haschat,
  getflagchats,
  flagchat,
  unflagchat,
  makezero
} = require("../controllers/message");

const {
  createproduct,
  getsingleproduct,
  updateproduct,
  getallproducts,
  getmixedvari,
  getvari,
  searchproducts,
  getcateproducts,
  getsubcateproducts,
  addfav,
  removefav,
  getfavp,
  isfav

} = require("../controllers/product");

const {
  getorderbystatus,
  changestatus,
  getorderbyid,
  setcod,
  setpaypal,
  setstripe,
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
  getsubcatebyid,
  detetecate,
  detetesubcate,
  getmixedcates

} = require("../controllers/category");

const {
  createreview,
  getallreviews

} = require("../controllers/review");


const {
  createpaymentsettings,
  updatepaymentsettings,
  getpaymentsettings,
  createcoupon,
  updatecoupon,
  getallcopuns,
  getcopun,
  getallslider,
  createslider,
  updateslider,
  createfooter,
  updatefooter,
  getfooter,
  createterm,
  updateterm,
  getterm,
  createshiping,
  updateshiping,
  getshiping

} = require("../controllers/setting");



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
router.get("/getorderbyid/:id", 
    isAuth,
    getorderbyid
);
router.get("/getorderbystatus/:userid/:status", 
    isAuth,
    getorderbystatus
);
router.post("/changestatus/:id/:userid/:status", 
    isAuth,
    changestatus
);


router.post("/createreview", 
    isAuth,
    createreview
);

router.get("/getallreviews/:pid", getallreviews);



router.post("/imageupload",upload.single('file'), imageupload);
router.post("/deleteimage",deleteimage);
router.get("/getsingleproduct/:id",getsingleproduct);
router.get("/getsellerproducts/:id",getsellerproducts);
router.get("/getmixedvari/:id",getmixedvari);
router.get("/getvari/:id",getvari);


router.get("/getallproducts/:sortby",getallproducts);
router.get("/getcateproducts/:id",getcateproducts);
router.get("/getsubcateproducts/:id",getsubcateproducts);
router.get("/searchproducts/:text/:sortby",searchproducts);




router.get("/getadminmoderator",getadminmoderator);
router.post("/setadminmoderator",setadminmoderator);


router.post("/createchat",createchat);
router.post("/haschat",haschat);
router.post("/makezero",makezero);
router.post("/createmessege",createmessege);
router.post("/flagchat",flagchat);
router.post("/unflagchat",unflagchat);
router.get("/getchats/:id/:page",getchats);
router.get("/getflagchats/:id/:page",getflagchats);
router.get("/getmessages/:chatid/:userid/:page",getmessages);


router.get("/getsellers",getsellers);
router.get("/getsingleseller/:id",getsingleseller);



router.get("/getusers",getusers);
router.get("/getsingleuser/:id",getsingleuser);


router.get("/getmixedcates",getmixedcates);
router.get("/getcategoryes",getcategoryes);
router.get("/getallsubcate",getallsubcate);
router.get("/getsubcatebyid/:id",getsubcatebyid);
router.get("/getallcate",getallcate);
router.post("/createcate",createcate);
router.post("/createsubcate",createsubcate);

router.post("/detetecate",detetecate);
router.post("/detetesubcate",detetesubcate);




router.post("/signup",signup);
router.post("/sendotp",sendotp);
router.post("/setac",setac);
router.post("/fsendotp",fsendotp);
router.post("/fsetac",fsetac);
router.post("/ownotp",ownotp);


router.get("/getpaymentsettings",getpaymentsettings);
router.post("/createpaymentsettings",createpaymentsettings);
router.post("/updatepaymentsettings",updatepaymentsettings);



router.get("/getcopun/:code",getcopun);
router.get("/getallcopuns",getallcopuns);
router.post("/createcoupon",createcoupon);
router.post("/updatecoupon",updatecoupon);



router.get("/getallslider",getallslider);
router.post("/createslider",createslider);
router.post("/updateslider",updateslider);


router.get("/getfooter",getfooter);
router.post("/createfooter",createfooter);
router.post("/updatefooter",updatefooter);


router.get("/getterm",getterm);
router.post("/createterm",createterm);
router.post("/updateterm",updateterm);



router.get("/getshiping",getshiping);
router.post("/createshiping",createshiping);
router.post("/updateshiping",updateshiping);





router.get("/getfavp/:uid/:page",getfavp);
router.get("/isfav/:uid/:pid",isfav);

router.post("/addfav/:uid/:pid",addfav);
router.post("/removefav/:uid/:pid",removefav);


router.get("/getaddress/:id", 
isAuth,
getaddress
);
router.post("/updateaddress/", 
isAuth,
updateaddress
);
router.post("/createaddress/", 
isAuth,
createaddress
);

router.get("/setcod/:id", 
isAuth,
setcod
);

router.get("/setpaypal/:id", 
isAuth,
setpaypal
);

router.post("/setstripe/", 
isAuth,
setstripe
);

module.exports = router;
