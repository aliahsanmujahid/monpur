const db = require("../config/db");
const { sendError } = require("../utils/helper");
const connection = require("../config/db2");

exports.createreview = async (req, res, next) => {

    const { pid,ratting,review, image1, image2,image3,image4 } = req.body;
  
        let data = {pid:pid,ratting:ratting,review:review,
            image1: image1,image2: image2,image3: image3,
            image4: image4}; 
    
    
    
        let sql = 'INSERT INTO reviews SET ?';
        let query = db.query(sql, data, (err, result) => {
        if(err) throw err;
    
        if(image1 !== ''){
            var sql1 = "DELETE FROM imgwatch WHERE url = ?";
           db.query(sql1, image1, (err, result) => {
                   if(err) throw err;
                    console.log("file1 deleted from mysql");
        });
        }
        if(image2 !== ''){
            var sql1 = "DELETE FROM imgwatch WHERE url = ?";
           db.query(sql1, image2, (err, result) => {
                   if(err) throw err;
                    console.log("file1 deleted from mysql");
        });
        }
        if(image3 !== ''){
            var sql1 = "DELETE FROM imgwatch WHERE url = ?";
           db.query(sql1, image3, (err, result) => {
                   if(err) throw err;
                    console.log("file1 deleted from mysql");
        });
        }
        if(image4 !== ''){
            var sql1 = "DELETE FROM imgwatch WHERE url = ?";
           db.query(sql1, image4, (err, result) => {
                   if(err) throw err;
                    console.log("file1 deleted from mysql");
        });
        }
        
        
        let sql = `SELECT * FROM reviews WHERE id = ?`;
        let query = db.query(sql,[result.insertId], (err, result) => {
          if(err) throw err;
           res.send(result[0]);
        })
    
        });

};

exports.getallreviews = async (req, res, next) => {

    let sql = `SELECT * FROM reviews WHERE pid = ? limit 3`;
    let query = db.query(sql,[req.params.pid], (err, result) => {
          if(err) throw err;
           res.send(result);
    })
 };