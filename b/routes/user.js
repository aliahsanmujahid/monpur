const express = require("express");
const multer = require("multer");
const { v4: uuid } = require('uuid')
const { isAuth, isAdmin } = require("../middlewares/auth");

const {
  create,
  signIn,
  createproduct,
  imageupload,
  deleteimage,
  getallproducts,
  getsingleproduct,
  getsellerproducts,
  createchat,
  createmessege,
  getchats,
  getmessages,
  getsellers,
  getsingleseller,
  getusers,
  getsingleuser,
  send


} = require("../controllers/user");

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

router.post("/create", create);
router.post("/signin", signIn);
router.post("/createproduct", 
    isAuth,
    isAdmin,
    createproduct
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

router.post("/send",send);


module.exports = router;
