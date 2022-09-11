const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/helper");
const fs = require('fs');
var productCache = new Map();

exports.create = async (req, res) => {
  const { name, email, password,isVerified,role } = req.body;

    let sql1 = `SELECT * FROM users WHERE email = ?`;
        let query1 = db.query(sql1, [req.body.email],(err, result) => {
          if(err) throw err;
          if(result.length !== 0){
              console.log("User exists");
              return sendError(res, "User Exist!");
          }else{
            let user = {name: name, email:email,
              password:password,isVerified:isVerified,role:role};

              let sql = 'INSERT INTO users SET ?';
              let query = db.query(sql, user, (err, result) => {
                  if(err) throw err;
                  console.log("user added");
                  let sql = `SELECT * FROM users WHERE id = ${result.insertId}`;
                  let query = db.query(sql, (err, result) => {
                    if(err) throw err;
                    const jwtToken = jwt.sign({ userid: result[0].id
                      ,name: result[0].name,email: result[0].email,
                      isVerified:result[0].isVerified,role:result[0].role }, process.env.JWT_SECRET);
                    
                      res.send({
                        jwtToken
                      });
                });
              });
          }
      });

};



exports.signIn = async (req, res, next) => {
  var numPerPage = 3;
  var skip = (1-1) * numPerPage; 
  var limit = skip + ',' + numPerPage;

  let sql = `SELECT * FROM users WHERE email = ? LIMIT ` + limit;
        let query = db.query(sql, [req.body.email],(err, result) => {
          if(err) throw err;
          if(result.length !== 0){
            if(result[0].password !== req.body.password){
              console.log("password dosent match");
              return sendError(res, "password dosent match");
            }else{
              const jwtToken = jwt.sign({ userid: result[0].id
                ,name: result[0].name,email: result[0].email,
                isVerified:result[0].isVerified,role:result[0].role }, process.env.JWT_SECRET);
              
                res.send({
                  jwtToken
                });
            }
          }else{
            return sendError(res, "No User Found!");
          }
      });
};



exports.createproduct = async (req, res, next) => {
  productCache.set(Object.values(['userProducts']).join('-'),null);

  const { name, details, orgprice,discprice,file1,file2,file3,file4,file5,file6,file7,file8 } = req.body;

  let product = {sellerid:req.user.id,name: name, details:details,
    orgprice:orgprice,discprice:discprice,file1:file1,
    file2:file2,file3:file3,file4:file4,file5:file5,file6:file6,
    file7:file7,file8:file8};


    let sql = 'INSERT INTO products SET ?';
    let query = db.query(sql, product, (err, result) => {
        if(err) throw err;
        console.log("product added");

        if(file1 !== ''){
          var sql1 = "DELETE FROM imgwatch WHERE url = ?";
          let query = db.query(sql1, file1, (err, result) => {
             if(err) throw err;
              console.log("file1 deleted from mysql");
            });
        }
        if(file2 !== ''){
          var sql1 = "DELETE FROM imgwatch WHERE url = ?";
          let query = db.query(sql1, file2, (err, result) => {
             if(err) throw err;
              console.log("file2 deleted from mysql");
            });
        }
        if(file3 !== ''){
          var sql1 = "DELETE FROM imgwatch WHERE url = ?";
          let query = db.query(sql1, file3, (err, result) => {
             if(err) throw err;
              console.log("file3 deleted from mysql");
            });
        }
        if(file4 !== ''){
          var sql1 = "DELETE FROM imgwatch WHERE url = ?";
          let query = db.query(sql1, file4, (err, result) => {
             if(err) throw err;
              console.log("file4 deleted from mysql");
            });
        }
        if(file5 !== ''){
          var sql1 = "DELETE FROM imgwatch WHERE url = ?";
          let query = db.query(sql1, file5, (err, result) => {
             if(err) throw err;
              console.log("file5 deleted from mysql");
            });
        }
        if(file6 !== ''){
          var sql1 = "DELETE FROM imgwatch WHERE url = ?";
          let query = db.query(sql1, file6, (err, result) => {
             if(err) throw err;
              console.log("file6 deleted from mysql");
            });
        }
        if(file7 !== ''){
          var sql1 = "DELETE FROM imgwatch WHERE url = ?";
          let query = db.query(sql1, file7, (err, result) => {
             if(err) throw err;
              console.log("file7 deleted from mysql");
            });
        }
        if(file8 !== ''){
          var sql1 = "DELETE FROM imgwatch WHERE url = ?";
          let query = db.query(sql1, file8, (err, result) => {
             if(err) throw err;
              console.log("file8 deleted from mysql");
            });
        }

        let sql = `SELECT * FROM products WHERE id = ${result.insertId}`;
        let query = db.query(sql, (err, result) => {
          if(err) throw err;
          res.send(result);
      });
    });


};

exports.getallproducts = async (req, res, next) => {
       var response = productCache.get(Object.values(['userProducts']).join('-'));
       if(response){
        //console.log("getting from catching response");
        res.send(response);
       }else{
        //console.log("getting from database");
        let sql = `SELECT * FROM products`;
        let query = db.query(sql, (err, result) => {
          if(err) throw err;
          productCache.set(Object.values(['userProducts']).join('-'), result);
         
          res.send(result);
      });
       }
};
exports.getsingleproduct = async (req, res, next) => {

  const product = [...productCache.values()]
  .reduce((arr, elem) => arr.concat(elem), [])
  .find((product) => product.id === Number(req.params.id));

  //console.log("product",product);

  if (product) {
    console.log("siingle product catching");
    //console.log("product",product);
    res.send(product);
  }else{
    let sql = `SELECT * FROM products WHERE id = ?`;
    let query = db.query(sql,[req.params.id], (err, result) => {
      if(err) throw err;
       res.send(result[0]);
    });
  }

};

exports.getsellerproducts = async (req, res, next) => {

    let sql = `SELECT * FROM products WHERE sellerid = ?`;
    let query = db.query(sql,[req.params.id], (err, result) => {
      if(err) throw err;
       res.send(result);
    })

};


exports.imageupload = async (req, res, next) => {

  let data = {url: req.file.path, userid:req.body.userid,issaved:'false'};

  let sql = 'INSERT INTO imgwatch SET ?';
    let query = db.query(sql, data, (err, result) => {
        if(err) throw err;
        console.log("imgwatch added");
    });
  
  res.send({
    imagePath: req.file.path,
    message: 'Image Uploaded',
    success: true
  });

};

exports.deleteimage = async (req, res, next) => {
  imagePath = req.body.imagePath;
  
  var sql = "DELETE FROM imgwatch WHERE url = ?";
  let query = db.query(sql, imagePath, (err, result) => {
    if(err) throw err;
    console.log("imgwatch deleted from mysql");
  });
  
  fs.unlink(imagePath, err => {
    res.send({
      message: 'Image Deleted',
      success: true
    });
  });

};





exports.createchat = async (req, res, next) => {

  const { senderid, receiverid } = req.body;

  if(senderid == receiverid){
    return sendError(res, "Same Chat Not Allowed");
  }

  let sql1 = `SELECT * FROM chat WHERE senderid = ${senderid} && receiverid = ${receiverid}`;

                  let query1 = db.query(sql1, (err, result) => {
                    if(err) throw err;
                    if(result.length !== 0){
                      console.log("chat exist");
                      return sendError(res, "Chat Already Exists");
                    }else{
                      console.log("cretting chat");

                      let data = {senderid: senderid, receiverid:receiverid };

                      let sql = 'INSERT INTO chat SET ?';
                      let query = db.query(sql, data, (err, result) => {

                        if(err) throw err;
                        console.log("chat added");
                        let sql = `SELECT * FROM chat WHERE id = ${result.insertId}`;
                                  let query = db.query(sql, (err, result) => {
                                    if(err) throw err;
                                      res.send(result[0]);
                                });
                      });    
                    }
                });


};


exports.haschat = async (req, res, next) => {

  const { senderid, receiverid } = req.body;

  let sql1 = `SELECT * FROM chat WHERE senderid = ${senderid} && receiverid = ${receiverid}`;
                  let query1 = db.query(sql1, (err, result) => {
                    if(err) throw err;
                    if(result.length !== 0){
                      console.log("has chat");
                      let sql = `SELECT * FROM message WHERE chatid = ${result[0].id}`;
                      let query = db.query(sql, (err, result) => {
                        if(err) throw err;
                          res.send(result);
                      }); 
                    }else{
                      res.send(null);   
                    }
                });
};



exports.createmessege = async (req, res, next) => {

  const { chatid, senderid, message  } = req.body;

  let data = {chatid: chatid, senderid:senderid, message: message};

                      let sql = 'INSERT INTO message SET ?';
                      let query = db.query(sql, data, (err, result) => {

                        if(err) throw err;
                        let sql = `SELECT * FROM message WHERE id = ${result.insertId}`;
                                  let query = db.query(sql, (err, result) => {
                                    if(err) throw err;
                                      res.send(result[0]);
                                });
                      });  
};


exports.getchats = async (req, res, next) => {
  
  const  userid  = req.params.id;

  let sql = `SELECT * FROM chat WHERE senderid = ${userid} || receiverid =  ${userid}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
      res.send(result);
  });                        

};

exports.getmessages = async (req, res, next) => {
  const  chatid  = req.params.id;


  var numPerPage = 10;
  var skip = (1-1) * numPerPage; 
  var limit = skip + ',' + numPerPage;

  let sql = `SELECT * FROM message WHERE chatid = ${chatid} ORDER BY id DESC LIMIT ` + limit ;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
      res.send(result);
  });   

};



exports.getsellers = async (req, res, next) => {
  
  let sql = `SELECT * FROM users`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
      res.send(result);
  });   

};

exports.getsingleseller = async (req, res, next) => {

  let sql = `SELECT * FROM users WHERE id = ?`;
  let query = db.query(sql,[req.params.id], (err, result) => {
    if(err) throw err;
     res.send(result[0]);
  });

};




exports.getusers = async (req, res, next) => {
  
  let sql = `SELECT * FROM users`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
      res.send(result);
  });   

};

exports.getsingleuser = async (req, res, next) => {

  let sql = `SELECT * FROM users WHERE id = ?`;
  let query = db.query(sql,[req.params.id], (err, result) => {
    if(err) throw err;
     res.send(result[0]);
  });

};


exports.send = async (req, res, next) => {

  const axios = require('axios');

  const greenwebsms = new URLSearchParams();
  greenwebsms.append('token', '844822424316627417630c92e4b9b943e3f7d293018d4374b0c8');
  greenwebsms.append('to', '+8801780804768');
  greenwebsms.append('message', 'Monpur OTP is 0009 ');
  axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then(response => {
    console.log(response.data);
  });  


  res.send("0009");
};










