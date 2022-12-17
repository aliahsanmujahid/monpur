const db = require("../config/db");
const { sendError } = require("../utils/helper");
const connection = require("../config/db2");

exports.createreview = async (req, res, next) => {

    const con = await connection;

    const { pid,opid,ratting,review, image1, image2,image3,image4 } = req.body;
  
        let data = {opid:opid,pid:pid,isa:0,ratting:ratting,review:review,
            image1: image1,image2: image2,image3: image3,
            image4: image4}; 
    
    
    
        let sql = 'INSERT INTO reviews SET ?';
        await db.query(sql, data, async (err, result) => {
        if(err) throw err;
    
        if(image1 !== ''){
            var sql1 = "DELETE FROM imgwatch WHERE url = ?";
            await db.query(sql1, image1, (err, result) => {
                   if(err) throw err;
                    console.log("file1 deleted from mysql");
        });
        }
        if(image2 !== ''){
            var sql1 = "DELETE FROM imgwatch WHERE url = ?";
            await db.query(sql1, image2, (err, result) => {
                   if(err) throw err;
                    console.log("file1 deleted from mysql");
        });
        }
        if(image3 !== ''){
            var sql1 = "DELETE FROM imgwatch WHERE url = ?";
            await db.query(sql1, image3, (err, result) => {
                   if(err) throw err;
                    console.log("file1 deleted from mysql");
        });
        }
        if(image4 !== ''){
            var sql1 = "DELETE FROM imgwatch WHERE url = ?";
            await db.query(sql1, image4, (err, result) => {
                   if(err) throw err;
                    console.log("file1 deleted from mysql");
        });
        }
        
        var sqle = `UPDATE orderitems SET isr = 1 WHERE id = ?`;
        await con.query(sqle, [opid], function (err, result) {
          if (err){
            return sendError(res, "Not Exist!");
          };
        });
        var sqle = `UPDATE products SET tr = tr+1 WHERE id = ?`;
        await  con.query(sqle, [pid], function (err, result) {
              if (err){
                return sendError(res, "Not Exist!");
              };
        }); 


        });

        res.send({
            succ:true,
        });

};

exports.getallreviews = async (req, res, next) => {

    var numPerPage = 1;
    var skip = (req.params.page-1) * numPerPage; 
    var limit = skip + ',' + numPerPage;

    let sql = `SELECT * FROM reviews WHERE isa = 1 && pid = ? ORDER BY ratting DESC limit `  + limit;
    await db.query(sql,[req.params.pid], (err, result) => {
          if(err) throw err;
           res.send(result);
    })
 };


 exports.getreview = async (req, res, next) => {

    let sql = `SELECT * FROM reviews WHERE opid = ? `;
    await db.query(sql,[req.params.id], (err, result) => {
          if(err) throw err;
           res.send(result);
    })
 };

 
 exports.updatereview = async (req, res, next) => {

    const con = await connection;

    const {id,pid,opid,ratting,review, image1, image2,image3,image4 } = req.body;

    await con.execute (
        "UPDATE reviews SET opid = ?, pid = ?, isa = ?, ratting = ?, review = ?, image1 = ?, image2 = ?, image3 = ?, image4 = ? where id = ?", 
        [opid,pid,0,ratting,review,image1, image2,image3,image4,id]
      );  
        res.send({
            succ:true,
        });

 };














 

 exports.rchangestatus = async (req, res, next) => {

    const con = await connection;
    var sqle = `UPDATE reviews SET isa = ? WHERE id = ?`;
    await con.query(sqle, [req.params.s,req.params.id], function (err, result) {
      if (err){
        return sendError(res, "Not Exist!");
      };
    }); 
    res.send({
        succ:true,
    });

 };


 exports.getreviewbys = async (req, res, next) => {

    var numPerPage = 10;
    var skip = (req.params.page-1) * numPerPage; 
    var limit = skip + ',' + numPerPage;

    var st = req.params.s;
    let sql = null;

    if(st == -1){
        sql = `SELECT * FROM reviews ORDER BY id asc limit `  + limit;
    }else{
        sql = `SELECT * FROM reviews where isa = ? ORDER BY id asc limit `  + limit;
    }
    
    await db.query(sql,[st], (err, result) => {
            if(err) throw err;
             res.send(result);
    })
    
 };
