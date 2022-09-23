const db = require("../config/db");
const { sendError } = require("../utils/helper");
const connection = require("../config/db2");


exports.getcategoryes = async (req, res, next) => {

      const con = await connection;
      var data = [];

      const [result] = await con.execute('SELECT * FROM cate');
      

      for(let i=0;i<result.length;i++){

      const [subcate] = await con.execute('SELECT * FROM subcate WHERE cateid = ? ', [result[i].id]);
      data.push({...result[i],subcate});

      }
      

      res.send(data);

};

exports.createcate = async (req, res, next) => {

    let data = {name:req.body.name,image: req.body.image}; 



    let sql = 'INSERT INTO cate SET ?';
    let query = db.query(sql, data, (err, result) => {
    if(err) throw err;

    var sql1 = "DELETE FROM imgwatch WHERE url = ?";
    db.query(sql1, req.body.image, (err, result) => {
               if(err) throw err;
                console.log("file1 deleted from mysql");
    });
    
    
    let sql = `SELECT * FROM cate WHERE id = ?`;
    let query = db.query(sql,[result.insertId], (err, result) => {
      if(err) throw err;
       res.send(result[0]);
    })

    });

};

exports.createsubcate = async (req, res, next) => {

    let data = {cateid:req.body.cateid,name:req.body.name,image: req.body.image}; 

    let sql = 'INSERT INTO subcate SET ?';
    let query = db.query(sql, data, (err, result) => {
    if(err) throw err;
    
    var sql1 = "DELETE FROM imgwatch WHERE url = ?";
    db.query(sql1, req.body.image, (err, result) => {
               if(err) throw err;
                console.log("file1 deleted from mysql");
    });

    let sql = `SELECT * FROM subcate WHERE id = ?`;
    let query = db.query(sql,[result.insertId], (err, result) => {
      if(err) throw err;
       res.send(result[0]);
    })
    
  });

};

exports.getallcate = async (req, res, next) => {

  let sql = `SELECT * FROM cate`;
  let query = db.query(sql, async (err, result) => {
    if(err) throw err;
    res.send(result);
  })
};

exports.getallsubcate = async (req, res, next) => {

    let sql = `SELECT * FROM subcate`;
    let query = db.query(sql, async (err, result) => {
      if(err) throw err;
      res.send(result);
    })
};
exports.getsubcatebyid = async (req, res, next) => {

  let sql = `SELECT * FROM subcate where cateid = ?`;
  let query = db.query(sql,[req.params.id], async (err, result) => {
    if(err) throw err;
    res.send(result);
  })
};
