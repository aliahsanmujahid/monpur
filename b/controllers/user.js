const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/helper");
const fs = require('fs');
const connection = require("../config/db2");


var productCache = new Map();



exports.signIn = async (req, res, next) => {

  let sql = `SELECT * FROM users WHERE pnumber = ?`;
        let query = db.query(sql, [req.body.pnumber],(err, result) => {
          if(err) throw err;
          if(result.length !== 0){
            if(result[0].password !== req.body.password){
              console.log("password dosent match");
              return sendError(res, "password dosent match");
            }else{
              const jwtToken = jwt.sign({ userId: result[0].id
                ,name: result[0].name,pnumber: result[0].pnumber,
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






exports.getsellerproducts = async (req, res, next) => {

    let sql = `SELECT * FROM products WHERE sellerid = ?`;
    let query = db.query(sql,[req.params.id], (err, result) => {
      if(err) throw err;
       res.send(result);
    })

};


exports.imageupload = async (req, res, next) => {

  let data = {url: req.file.path, userId:req.body.userId,issaved:'false'};

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

  let sql1 = `SELECT * FROM chat WHERE senderid = ${senderid} && receiverid = ${receiverid} or senderid = ${receiverid} && receiverid = ${senderid}`;

                  let query1 = db.query(sql1, (err, result) => {
                    if(err) throw err;
                    if(result.length !== 0){
                      console.log("chat exist");
                      res.send(result);
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
                                      res.send(result);
                                });
                      });    
                    }
                });


};


exports.haschat = async (req, res, next) => {

  const { senderid, receiverid } = req.body;

  if(senderid == receiverid){
    return sendError(res, "Same Chat Not Allowed");
  }

  let sql1 = `SELECT * FROM chat WHERE senderid = ${senderid} && receiverid = ${receiverid} or senderid = ${receiverid} && receiverid = ${senderid}`;
                  let query1 = db.query(sql1, (err, result) => {
                    if(err) throw err;
                    if(result.length !== 0){
                      console.log("has chat");
                      // let sql = `SELECT * FROM message WHERE chatid = ${result[0].id}`;
                      // let query = db.query(sql, (err, result) => {
                      //   if(err) throw err;
                      //     res.send(result);
                      // }); 
                      res.send(result);

                    }else{
                      return sendError(res, "Chat Not exists");
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
  
  const  userId  = req.params.id;

  let sql = `SELECT * FROM chat WHERE senderid = ${userId} || receiverid =  ${userId}`;
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



exports.signup = async (req, res, next) => {

  const con = await connection;

  if(req.body.otp !== null && req.body.phonenumber !== null){

    const [data] = await con.execute('SELECT * FROM otpcheck WHERE pnumber = ? ', [ req.body.phonenumber ]);
    
    if(data[0].otp == req.body.otp ){

      await con.execute('DELETE FROM otpcheck WHERE pnumber = ? ', [ req.body.phonenumber ]);

      let sql = 'INSERT INTO users SET ?';
      let data = {
        pnumber: req.body.phonenumber,
        isVerified:"true",
        role:"user"
      };
      let query = db.query(sql, data, (err, result) => {
        if(err){
          return sendError(res, "Can,t Create Account");
        }
        res.send({
          verified:true,
          message:"Number is Verified"
          });
      });

      // console.log("Otp mached")
    }else{
      res.send({
        otpsended:false,
        message:"Otp not mached"
        });
    }

  }
 
};

exports.setac = async (req, res, next) => {

  const con = await connection;

  const [data] = await con.execute('SELECT * FROM users WHERE pnumber = ? ', [ req.body.pnumber ]);
  
  if(data.length > 0){

    const resultInsert = await con.execute (
      "UPDATE users SET name = ?, password = ? WHERE pnumber = ?", 
      [req.body.name,req.body.password,req.body.pnumber]
    );
  
    let sql = `SELECT * FROM users WHERE pnumber = ${req.body.pnumber}`;

    let query = db.query(sql, (err, result) => {
      if(err) throw err;
       
      const jwtToken = jwt.sign({ userId: result[0].id
        ,name: result[0].name,pnumber: result[0].pnumber,
        isVerified:result[0].isVerified,role:result[0].role }, process.env.JWT_SECRET);
      
       return res.send({
          jwtToken
        });
    });                
  
  }

}


exports.sendotp = async (req, res, next) => {

  const con = await connection;

  const [data] = await con.execute('SELECT * FROM users WHERE pnumber = ? ', [ req.body.phonenumber ]);
    
  if(data.length > 0){
    if(data[0].password == null && data[0].isVerified == "true"){
      return res.send({
        verified:true,
        message:"Number is Verified"
        });
    }
    return res.send({
      otpsended:false,
      haveac:true,
      message:"ALREADY HAVE AN ACCOUNT"
      });
  }

  if(req.body.phonenumber !== null){

    const [data] = await con.execute('SELECT * FROM otpcheck WHERE pnumber = ? ', [ req.body.phonenumber ]);
    
    //console.log("data",data);

    if(data.length !== 0){
       
      const [timeago] = await con.execute('SELECT TIME_TO_SEC(TIMEDIFF(NOW(), `date`)) AS secondsAgo  FROM otpcheck WHERE pnumber = ? ', [ req.body.phonenumber ]);

      if(timeago[0].secondsAgo > 100){
        await con.execute('DELETE FROM otpcheck WHERE pnumber = ? ', [ req.body.phonenumber ]);

        var random = Math.floor(1000 + Math.random() * 9000);
        let otpdata = {
        pnumber: req.body.phonenumber,
        otp:random
       };
      let sql = 'INSERT INTO otpcheck SET ?';
      let query = db.query(sql, otpdata, (err, result) => {
        if(err){
          return sendError(res, "Otp Can,t send");
        }
        res.send({
          otpsended:true,
          message:"New OTP sended"
          });
      });
        
      }else{
        res.send({
          otpsended:true,
          message:"ALREADY HAVE AN OTP,NEW OTP AFTER 4 MINITE"
          });
      }
    }

    if(data.length == 0){
      console.log("Sending otp")
      var random = Math.floor(1000 + Math.random() * 9000);
      let otpdata = {
        pnumber: req.body.phonenumber,
        otp:random
      };
      let sql = 'INSERT INTO otpcheck SET ?';
      let query = db.query(sql, otpdata, (err, result) => {
        if(err){
          return sendError(res, "Otp Can,t send");
        }
        res.send({
          otpsended:true,
          message: "OTP sended successfully"
          });
      });
      // console.log("data",resultInsert);
    }
  }

    // const axios = require('axios');

  // const greenwebsms = new URLSearchParams();
  // greenwebsms.append('token', '844822424316627417630c92e4b9b943e3f7d293018d4374b0c8');
  // greenwebsms.append('to', '+8801780804768');
  // greenwebsms.append('message', 'Monpur OTP is 0009 ');
  // axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then(response => {
  //   console.log(response.data);
  // }); 

}



exports.fsetac = async (req, res, next) => {

  const con = await connection;

  const [data] = await con.execute('SELECT * FROM otpcheck WHERE pnumber = ? ', [ req.body.pnumber ]);

  if(data.length > 0){
    if(data[0].otp == req.body.otp){

      const resultInsert = await con.execute (
          "UPDATE users SET password = ? WHERE pnumber = ?", 
          [req.body.password,req.body.pnumber]
        );
        await con.execute('DELETE FROM otpcheck WHERE pnumber = ? ', [ req.body.pnumber ]);
    
    
        res.send({
          message:"Password Reset Successfully"
          });
      }else{
        res.send({
          message:"OTP dosen,t match"
          });
      }
  }else{
    res.send({
      message:"Someething problem"
      });
  }

}


exports.fsendotp = async (req, res, next) => {

  const con = await connection;

  if(req.body.pnumber !== null){

    const [data] = await con.execute('SELECT * FROM otpcheck WHERE pnumber = ? ', [ req.body.pnumber ]);
    

    if(data.length !== 0){
       
      const [timeago] = await con.execute('SELECT TIME_TO_SEC(TIMEDIFF(NOW(), `date`)) AS secondsAgo  FROM otpcheck WHERE pnumber = ? ', [ req.body.pnumber ]);

      if(timeago[0].secondsAgo > 100){
        await con.execute('DELETE FROM otpcheck WHERE pnumber = ? ', [ req.body.pnumber ]);

        var random = Math.floor(1000 + Math.random() * 9000);
        let otpdata = {
        pnumber: req.body.pnumber,
        otp:random
       };
      let sql = 'INSERT INTO otpcheck SET ?';
      let query = db.query(sql, otpdata, (err, result) => {
        if(err){
          return sendError(res, "Otp Can,t send");
        }
        res.send({
          otpsended:true,
          message:"New OTP sended"
          });
      });
        
      }else{
        res.send({
          otpsended:true,
          message:"ALREADY HAVE AN OTP,NEW OTP AFTER 4 MINITE"
          });
      }
    }

    if(data.length == 0){
      console.log("Sending otp")
      var random = Math.floor(1000 + Math.random() * 9000);
      let otpdata = {
        pnumber: req.body.pnumber,
        otp:random
      };
      let sql = 'INSERT INTO otpcheck SET ?';
      let query = db.query(sql, otpdata, (err, result) => {
        if(err){
          return sendError(res, "Otp Can,t send");
        }
        res.send({
          otpsended:true,
          message: "OTP sended successfully"
          });
      });
      // console.log("data",resultInsert);
    }
  }

    // const axios = require('axios');

  // const greenwebsms = new URLSearchParams();
  // greenwebsms.append('token', '844822424316627417630c92e4b9b943e3f7d293018d4374b0c8');
  // greenwebsms.append('to', '+8801780804768');
  // greenwebsms.append('message', 'Monpur OTP is 0009 ');
  // axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then(response => {
  //   console.log(response.data);
  // }); 

}



















