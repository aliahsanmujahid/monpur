
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/helper");
const fs = require('fs');
const connection = require("../config/db2");
const { sizes } = require("./dbcreate");



exports.updateproduct = async (req, res, next) => {

      let sqlc = `DELETE FROM  colors WHERE pid = ${req.body.id}`;
      let queryc = db.query(sqlc, (err, result) => {
        if(err) throw err;
      });

      let sqls = `DELETE FROM  sizes WHERE pid = ${req.body.id}`;
      let querys = db.query(sqls, (err, result) => {
        if(err) throw err;
      });    
  
      if(req.body.colors.length > 0){
        for (let i = 0; i < req.body.colors.length; i++) {

            let sdata = {pid:req.body.id,name: req.body.colors[i].name,
                colorCode:req.body.colors[i].colorCode,
                quantity:req.body.colors[i].quantity
            }; 

            let sql = 'INSERT INTO colors SET ?';
            let query = db.query(sql, sdata, (err, result) => {
            if(err) throw err;
        });
        }
      }
      if(req.body.sizes.length > 0){
        for (let i = 0; i < req.body.sizes.length; i++) {

            let sdata = {pid:req.body.id,name: req.body.sizes[i].name,
                variCode:req.body.sizes[i].variCode,
                quantity:req.body.sizes[i].quantity
            }; 

            let sql = 'INSERT INTO sizes SET ?';
            let query = db.query(sql, sdata, (err, result) => {
            if(err) throw err;
        });
        }
        }

  
     const con = await connection;


   const { name, details, orgprice,discprice,qty,file1,file2,file3,file4,file5,file6,file7,file8 } = req.body;


  const resultInsert = await con.execute (
      "UPDATE products SET sellerid = ?, name = ? , details = ? , orgprice = ? , discprice = ? , qty = ? , file1 = ? , file2 = ?, file3 = ?, file4 = ?, file5 = ?, file6 = ?, file7 = ?, file8 = ? WHERE id = ?", 
      [req.user.id,name,details,orgprice,discprice,qty,file1,file2,file3,file4,file5,file6,file7,file8,req.body.id]
    ); 

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


      let sql = `select * from products where id=${req.body.id}`;
        let query = db.query(sql, async (err, result) => {

          var data = result[0]
          const [sizes] = await con.execute('SELECT * FROM sizes WHERE pid = ? ', [data.id]);
          const [colors] = await con.execute('SELECT * FROM colors WHERE pid = ? ', [data.id]);
          data = {...data,sizes,colors}
          if(err) throw err;
          res.send(data);
      });


 };


exports.getsingleproduct = async (req, res, next) => {

    const con = await connection;

    let sql = `SELECT * FROM products WHERE id = ?`;
    let query = db.query(sql,[req.params.id], async (err, result) => {

      if(err) throw err;

      var data = result[0]
      const [sizes] = await con.execute('SELECT * FROM sizes WHERE pid = ? ', [data.id]);
      const [colors] = await con.execute('SELECT * FROM colors WHERE pid = ? ', [data.id]);
      data = {...data,sizes,colors}
      res.send(data);
      
    });
  

};


exports.createproduct = async (req, res, next) => {
    const con = await connection;

  
    const { name, details, orgprice,discprice,qty,file1,file2,file3,file4,file5,file6,file7,file8 } = req.body;
  
    let product = {sellerid:req.user.id,name: name, details:details,
      orgprice:orgprice,discprice:discprice,
      qty:qty,file1:file1,
      file2:file2,file3:file3,file4:file4,file5:file5,file6:file6,
      file7:file7,file8:file8};
  
  
      let sql = 'INSERT INTO products SET ?';
      let query = db.query(sql, product, (err, result) => {
          if(err) throw err;
          console.log("product added");

          if(req.body.colors.length > 0){
            for (let i = 0; i < req.body.colors.length; i++) {

                let sdata = {pid:result.insertId,name: req.body.colors[i].name,
                    colorCode:req.body.colors[i].colorCode,
                    quantity:req.body.colors[i].quantity
                }; 

                let sql = 'INSERT INTO colors SET ?';
                let query = db.query(sql, sdata, (err, result) => {
                if(err) throw err;
            });
            }
          }
          if(req.body.sizes.length > 0){
            for (let i = 0; i < req.body.sizes.length; i++) {

                let sdata = {pid:result.insertId,name: req.body.sizes[i].name,
                    variCode:req.body.sizes[i].variCode,
                    quantity:req.body.sizes[i].quantity
                }; 

                let sql = 'INSERT INTO sizes SET ?';
                let query = db.query(sql, sdata, (err, result) => {
                if(err) throw err;
            });
            }
            }
  
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

          

          let sql = `select * from products where id=${result.insertId}`;
          let query = db.query(sql, async (err, result) => {

            var data = result[0]
            const [sizes] = await con.execute('SELECT * FROM sizes WHERE pid = ? ', [data.id]);
            const [colors] = await con.execute('SELECT * FROM colors WHERE pid = ? ', [data.id]);
            data = {...data,sizes,colors}
            if(err) throw err;
            res.send(data);
        });
      });
  
  
  };
