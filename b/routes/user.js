const express = require("express");
const multer = require("multer");
const { v4: uuid } = require('uuid')
const { isAuth, isAdmin } = require("../middlewares/auth");

const {
  signIn,
  imageupload,
  deleteimage,
  getallproducts,
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
  createorder,
  sendotp,
  setac,
  fsendotp,
  fsetac



} = require("../controllers/user");

const {
  createproduct,
  getsingleproduct,
  updateproduct

} = require("../controllers/product");

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

router.post("/imageupload",upload.single('file'), imageupload);
router.post("/deleteimage",deleteimage);
router.get("/getallproducts",getallproducts);
router.get("/getsingleproduct/:id",getsingleproduct);
router.get("/getsellerproducts/:id",getsellerproducts);


router.post("/createchat",createchat);
router.post("/createmessege",createmessege);
router.get("/getchats/:id",getchats);
router.get("/getmessages/:id",getmessages);


router.get("/getsellers",getsellers);
router.get("/getsingleseller/:id",getsingleseller);



router.get("/getusers",getusers);
router.get("/getsingleuser/:id",getsingleuser);


router.post("/createorder",createorder);





router.post("/signup",signup);
router.post("/sendotp",sendotp);
router.post("/setac",setac);
router.post("/fsendotp",fsendotp);
router.post("/fsetac",fsetac);

module.exports = router;
