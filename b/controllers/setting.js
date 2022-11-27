const db = require("../config/db");
const { sendError } = require("../utils/helper");
const connection = require("../config/db2");




exports.createpaymentsettings = async (req, res, next) => {

    const { cod,paypalid,stripepkey, stripeskey} = req.body;
       
    let data = {
        cod:cod,paypalid:paypalid,stripepkey:stripepkey,stripeskey:stripeskey
      };

      let sql = 'INSERT INTO paymentsetting SET ?';

      let query = db.query(sql, data, (err, result) => {
          if(err) throw err;

          let sql = `SELECT * FROM paymentsetting where id = ?`;

          let query = db.query(sql,result.insertId,(err, result) => {
            if (err){
              return sendError(res, "Not Exist!");
            };
             res.send(result[0]);
          })
      });   

 };

exports.updatepaymentsettings = async (req, res, next) => {

    const { id,cod,paypalid,stripepkey, stripeskey} = req.body;

    var sqle = `UPDATE paymentsetting SET cod = "${cod}", paypalid = "${paypalid}", stripepkey = "${stripepkey}", stripeskey = "${stripeskey}" Where id = ?`;

    db.query(sqle, [id], function (err, result) {
        if (err){
          return sendError(res, "Not Exist!");
        };
        let sql = `SELECT * FROM paymentsetting`;

        let query = db.query(sql ,(err, result) => {
          if (err){
            return sendError(res, "Not Exist!");
          };
           res.send(result[0]);
        })
      });
                               

 };


 exports.getpaymentsettings = async (req, res, next) => {

    let sql = `SELECT * FROM paymentsetting`;

    let query = db.query(sql ,(err, result) => {
          if(err) throw err;
           res.send(result[0]);
    })

 };





 

exports.createcoupon = async (req, res, next) => {

  const { code,value,minimun} = req.body;
     
  let data = {
    code:code,value:value,minimun:minimun
    };

    let sql = 'INSERT INTO coupon SET ?';

    let query = db.query(sql, data, (err, result) => {
        if(err) throw err;

        let sql = `SELECT * FROM coupon where id = ?`;

        let query = db.query(sql,result.insertId,(err, result) => {
          if (err){
            return sendError(res, "Not Exist!");
          };
           res.send(result[0]);
        })
    });   

};

exports.updatecoupon = async (req, res, next) => {

  const { id,code,value,minimun} = req.body;

  var sqle = `UPDATE coupon SET code = "${code}", value = "${value}", minimun = "${minimun}" Where id = ?`;

  db.query(sqle, [id], function (err, result) {
      if (err){
        return sendError(res, "Not Exist!");
      };
      let sql = `SELECT * FROM coupon where id = ? `;

      let query = db.query(sql,[id] ,(err, result) => {
        if (err){
          return sendError(res, "Not Exist!");
        };
         res.send(result[0]);
      })
    });
                             

};



exports.getallcopuns = async (req, res, next) => {

        let sql = `SELECT * FROM coupon`;

        let query = db.query(sql,(err, result) => {
          if (err){
            return sendError(res, "Not Exist!");
          };
           res.send(result);
        })

};

exports.getcopun = async (req, res, next) => {

  let sql = `SELECT * FROM coupon where code = ?`;

  let query = db.query(sql,[req.params.code],(err, result) => {
    if (err){
      return sendError(res, "Not Exist!");
    };
     res.send(result);
  })

};
















exports.createslider = async (req, res, next) => {

  const { img,title,heading,buttontext,buttonlink} = req.body;
     
  let data = {
    img:img,title:title,heading:heading,buttontext:buttontext,buttonlink:buttonlink
    };

    let sql = 'INSERT INTO slider SET ?';

    let query = db.query(sql, data, (err, result) => {
        if(err) throw err;


        var sql1 = "DELETE FROM imgwatch WHERE url = ?";
        db.query(sql1, img, (err, result) => {
          if(err) throw err;
           console.log("file1 deleted from mysql");
        });

        let sql = `SELECT * FROM slider where id = ?`;

        let query = db.query(sql,result.insertId,(err, result) => {
          if (err){
            return sendError(res, "Not Exist!");
          };
           res.send(result[0]);
        })
    });   

};

exports.updateslider = async (req, res, next) => {

  const { id,img,title,heading,buttontext,buttonlink} = req.body;

  // console.log("req.body", id,img,title,heading,buttontext,buttonlink);
  var sqle = `UPDATE slider SET img = ?, title = ?, heading = ?, buttontext = ? ,buttonlink = ? WHERE id = ?`;
  
  db.query(sqle, [img,title,heading,buttontext,buttonlink,id], function (err, result) {
      if (err){
        return sendError(res, "Not Exist!");
      };

      var sql1 = "DELETE FROM imgwatch WHERE url = ?";
        db.query(sql1, img, (err, result) => {
          if(err) throw err;
           console.log("file1 deleted from mysql");
      });

      let sql = `SELECT * FROM slider WHERE id = ? `;

      let query = db.query(sql,id,(err, result) => {
        if (err){
          return sendError(res, "Not Exist!");
        };
         res.send(result);
      })
    });
                             

};



exports.getallslider = async (req, res, next) => {

        let sql = `SELECT * FROM slider`;

        let query = db.query(sql,(err, result) => {
          if (err){
            return sendError(res, "Not Exist!");
          };
           res.send(result);
        })

};











exports.createfooter = async (req, res, next) => {


  const { address,email1,email2,phone1,phone2,fb,tw,ins,android,iphone} = req.body;
     
  let data = {
    address:address,email1:email1,email2:email2,phone1:phone1,phone2:phone2,
    fb:fb,tw:tw,ins:ins,android:android,iphone:iphone
    };

    let sql = 'INSERT INTO footer SET ?';

    let query = db.query(sql, data, (err, result) => {
        if(err) throw err;

        let sql = `SELECT * FROM footer where id = ?`;

        let query = db.query(sql,result.insertId,(err, result) => {
          if (err){
            return sendError(res, "Not Exist!");
          };
           res.send(result[0]);
        })
    });   

};

exports.updatefooter = async (req, res, next) => {

  const { id,address,email1,email2,phone1,phone2,fb,tw,ins,android,iphone} = req.body;
     
  var sqle = `UPDATE footer SET address = ?, email1 = ?, email2 = ?, phone1 = ? ,phone2 = ?,fb = ?,tw = ?,ins = ?,android = ?,iphone = ? WHERE id = ?`;
  
  db.query(sqle, [address,email1,email2,phone1,phone2,fb,tw,ins,android,iphone,id], function (err, result) {
      if (err){
        return sendError(res, "Not Exist!");
      };

      let sql = `SELECT * FROM footer WHERE id = ? `;

      let query = db.query(sql,id,(err, result) => {
        if (err){
          return sendError(res, "Not Exist!");
        };
         res.send(result);
      })
    });
                             

};



exports.getfooter = async (req, res, next) => {

        let sql = `SELECT * FROM footer`;

        let query = db.query(sql,(err, result) => {
          if (err){
            return sendError(res, "Not Exist!");
          };
           res.send(result[0]);
        })

};









exports.createterm = async (req, res, next) => {


  const { term} = req.body;
     
  let data = {
    term:term
    };

    let sql = 'INSERT INTO terms SET ?';

    let query = db.query(sql, data, (err, result) => {
        if(err) throw err;

        let sql = `SELECT * FROM terms where id = ?`;

        let query = db.query(sql,result.insertId,(err, result) => {
          if (err){
            return sendError(res, "Not Exist!");
          };
           res.send(result[0]);
        })
    });   

};

exports.updateterm = async (req, res, next) => {

  const { id,term} = req.body;

  console.log("term",req.body);
     
  var sqle = `UPDATE terms SET term = ? WHERE id = ?`;
  
  db.query(sqle, [term,id], function (err, result) {
      if (err){
        return sendError(res, "Not Exist!");
      };

      let sql = `SELECT * FROM terms WHERE id = ? `;

      let query = db.query(sql,id,(err, result) => {
        if (err){
          return sendError(res, "Not Exist!");
        };
         res.send(result);
      })
    });
                             

};



exports.getterm = async (req, res, next) => {

        let sql = `SELECT * FROM terms`;

        let query = db.query(sql,(err, result) => {
          if (err){
            return sendError(res, "Not Exist!");
          };
           res.send(result[0]);
        })

};














exports.createshiping = async (req, res, next) => {


  const { title,value} = req.body;
     
  let data = {
    title:title,
    value:value
    };

    let sql = 'INSERT INTO shiping SET ?';

    let query = db.query(sql, data, (err, result) => {
        if(err) throw err;

        let sql = `SELECT * FROM shiping where id = ?`;

        let query = db.query(sql,result.insertId,(err, result) => {
          if (err){
            return sendError(res, "Not Exist!");
          };
           res.send(result[0]);
        })
    });   

};

exports.updateshiping = async (req, res, next) => {

  const { id,title,value} = req.body;
     
  var sqle = `UPDATE shiping SET title = ?, value = ? WHERE id = ?`;
  
  db.query(sqle, [title,value,id], function (err, result) {
      if (err){
        return sendError(res, "Not Exist!");
      };

      let sql = `SELECT * FROM shiping WHERE id = ? `;

      let query = db.query(sql,id,(err, result) => {
        if (err){
          return sendError(res, "Not Exist!");
        };
         res.send(result);
      })
    });
                             

};



exports.getshiping = async (req, res, next) => {

        let sql = `SELECT * FROM shiping`;

        let query = db.query(sql,(err, result) => {
          if (err){
            return sendError(res, "Not Exist!");
          };
           res.send(result);
        })

};

