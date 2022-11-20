const db = require("../config/db");
const { sendError } = require("../utils/helper");
const connection = require("../config/db2");
const fs = require('fs');


exports.getmixedcates = async (req, res, next) => {

  const con = await connection;
  var data = [];
  const [result] = await con.execute('SELECT * FROM cate');
  for(let i=0;i<result.length;i++){
    data.push(result[i]);
  }
  const [results] = await con.execute('SELECT * FROM subcate');
  for(let i=0;i<results.length;i++){
    data.push(results[i]);
  }
  res.send(data);
};

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

  const con = await connection;

  var data = [];

  const [result] = await con.execute('SELECT * FROM cate');
  
  for(let i=0;i<result.length;i++){

  const [subcate] = await con.execute('SELECT * FROM subcate WHERE cateid = ? ', [result[i].id]);
  data.push({...result[i],subcate});
  }

  res.send(data);        
       
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


exports.detetecate = async (req, res, next) => {

  const con = await connection;

  const [result] = await con.execute('SELECT * FROM cate WHERE id = ? ', [req.body.id]);
  await deletecateimage(result[0].image);

  const [results] = await con.execute('SELECT * FROM subcate WHERE cateid = ? ', [req.body.id]);
  
  if(results.length > 0){
      for(let i=0;i<results.length;i++){
        await deletecateimage(results[i].image);
    }
  }

  await con.execute('DELETE FROM cate WHERE id = ? ', [ req.body.id ]);
  await con.execute('DELETE FROM subcate WHERE cateid = ? ', [ req.body.id ]);

  res.send({
    success:true
  });

};

function deletecateimage(imagePath){

  var sql = "DELETE FROM imgwatch WHERE url = ?";
  let query = db.query(sql, imagePath, (err, result) => {
    if(err) throw err;
    console.log("imgwatch deleted from mysql");
  });
  fs.unlink(imagePath, err => {
  });
  
}

exports.detetesubcate = async (req, res, next) => {

  const [result] = await con.execute('SELECT * FROM subcate WHERE id = ? ', [req.body.id]);
  
  await deletecateimage(result[0].image);

  await con.execute('DELETE FROM subcate WHERE id = ? ', [ req.body.id ]);

  res.send({
    success:true
  });

};
