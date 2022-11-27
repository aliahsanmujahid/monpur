
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/helper");
const fs = require('fs');
const connection = require("../config/db2");
const { sizes } = require("./dbcreate");


exports.getcateproducts = async (req, res, next) => {

  let sql = `SELECT * from products where cateid = ?`;
  let query = db.query(sql,[req.params.id], (err, result) => {
    if(err) throw err;
   
    res.send(result);
 });  

};


exports.getsubcateproducts = async (req, res, next) => {

  let sql = `SELECT * from products where subcateid = ?`;
  let query = db.query(sql,[req.params.id], (err, result) => {
    if(err) throw err;
   
    res.send(result);
 });  

};
exports.getallproducts = async (req, res, next) => {

  const sortby = req.params.sortby;
  
  let sql;
  if(sortby == 5){
     sql = `SELECT * from products ORDER BY price DESC`;
  }
  if(sortby == 6){
     sql = `SELECT * from products ORDER BY price ASC`;
  }
   let query = db.query(sql, (err, result) => {
     if(err) throw err;
     res.send(result);
    });  

};

exports.searchproducts = async (req, res, next) => {

  
  const con = await connection; 

  const keys = req.params.text.split(" ");
  const sortby = req.params.sortby;



  console.log("searchproducts",keys,sortby);

  var data = [];

  
  for(let i=0;i<keys.length;i++){
    if(sortby == 5){
      const [result] = await con.execute('SELECT * FROM products WHERE name LIKE "%'+keys[i]+'%" OR details LIKE "%'+keys[i]+'%"  ORDER BY price DESC');
      for(let i=0;i<result.length;i++){
        data.push(result[i]);
      }
    }
    if(sortby == 6){
      const [result] = await con.execute('SELECT * FROM products WHERE name LIKE "%'+keys[i]+'%" OR details LIKE "%'+keys[i]+'%"  ORDER BY price ASC');
      for(let i=0;i<result.length;i++){
        data.push(result[i]);
      }
    }

  }
   
  res.send(data);

};

exports.getcolors = async (req, res, next) => {

  let sql = `SELECT * from colors where pid = ?`;
  let query = db.query(sql,[req.params.id], (err, result) => {
    if(err) throw err;
   
    res.send(result);
 });  

};
exports.getsizes = async (req, res, next) => {

  let sql = `SELECT * from sizes where pid = ?`;
  let query = db.query(sql,[req.params.id], (err, result) => {
    if(err) throw err;
   
    res.send(result);
 });  

};




exports.getsingleproduct = async (req, res, next) => {

    console.log("Getting Single Product");
    
    const con = await connection;

    let sql = `SELECT * FROM products WHERE id = ?`;
    await db.query(sql,[req.params.id], async (err, result) => {

      if(err){
        return sendError(res, "Not Exist!");
      }

      var data = result[0]
      var vari1 = {
        id:0,
        name: '',
        values:[]
      };
      var vari2 = {
        id:0,
        name: '',
        values:[]
      };
      var mixedvari = {
        id: 0,
        vari1:'',
        vari2:'',
        values:[]
      };

      if(data.hasmixedvari != "true"){
        const [vari1data] = await con.execute('SELECT * FROM vari1 WHERE pid = ? ', [data.id]);
        const [vari2data] = await con.execute('SELECT * FROM vari2 WHERE pid = ? ', [data.id]);
        const [vari1values] = await con.execute('SELECT * FROM vari1values WHERE variid = ? ', [vari1data[0].id]);
        const [vari2values] = await con.execute('SELECT * FROM vari2values WHERE variid = ? ', [vari2data[0].id]);
      
        vari1 = {
          id:vari1data[0].id,
          name: vari1data[0].name,
          values:vari1values
        }
        vari2 = {
          id:vari2data[0].id,
          name: vari2data[0].name,
          values:vari2values
        }

        data = {...data,mixedvari,vari1,vari2}

      }else{
        const [mixedvaridata] = await con.execute('SELECT * FROM mixedvari WHERE pid = ? ', [data.id]);

        const [mixvalues] = await con.execute('SELECT * FROM mixvalues WHERE vid = ? ', [mixedvaridata[0].id]);
        

        mixedvari = {
          id:mixedvaridata[0].id,
          vari1: mixedvaridata[0].vari1,
          vari2: mixedvaridata[0].vari2,
          values:mixvalues
        }

        data = {...data,mixedvari,vari1,vari2}
     
      }

      res.send(data);        

      
    });
  

};























exports.createproduct = async (req, res, next) => {
    const con = await connection;

  
    const { cateid,subcateid,name, details,personalization,ispersonalization,sku, price,quantity,discount,file1,file2,file3,file4,file5,file6,file7,file8,
      hasvari1,
      hasprice1,
      hasquantity1,
      hasvari2,
      hasprice2,
      hasquantity2,
      hasmixedvari
     } = req.body;
  
     var tempprice = 0;

     if(req.body.hasmixedvari == 'true'){
      
      tempprice = req.body.mixedvari.values.sort((a, b) => Number(a.price) - Number(b.price))[0].price;

     }
     if(req.body.hasprice1 == 'true' && !req.body.hasmixedvari == 'true'){
      
      tempprice = req.body.vari1.values.sort((a, b) => Number(a.price) - Number(b.price))[0].price;

     }
     if(req.body.hasprice2 == 'true' && !req.body.hasmixedvari == 'true'){
      
      tempprice = req.body.vari2.values.sort((a, b) => Number(a.price) - Number(b.price))[0].price;

     }

    let product = {cateid:cateid,subcateid:subcateid,sellerid:req.user.id,name: name, details:details,
          personalization:personalization,ispersonalization:ispersonalization,sku:sku,
          price:price,tempprice:tempprice,discount:discount,quantity:quantity,
          file1:file1,
          file2:file2,file3:file3,file4:file4,file5:file5,file6:file6,
          file7:file7,file8:file8,

          hasvari1:hasvari1, hasprice1:hasprice1,hasquantity1:hasquantity1,
          hasvari2:hasvari2, hasprice2:hasprice2,hasquantity2:hasquantity2,
          hasmixedvari:hasmixedvari

        };

      let sql = 'INSERT INTO products SET ?';
      let query = db.query(sql, product, (err, result) => {
          if(err) throw err;
          console.log("product added");

          if(req.body.vari1.values.length > 0 && hasmixedvari != "true"){
            let vari1data = {pid:result.insertId,name: req.body.vari1.name}; 

                let sql = 'INSERT INTO vari1 SET ?';
                let query = db.query(sql, vari1data, (err, result) => {
                if(err){
                  return sendError(res, "Not Exist!");
                }
                for (let i = 0; i < req.body.vari1.values.length; i++) {

                  let vari1values = {
                      variid:result.insertId,
                      name: req.body.vari1.values[i].name,
                      price:req.body.vari1.values[i].price,
                      quantity:req.body.vari1.values[i].quantity,
                      sku:req.body.vari1.values[i].sku
                  }; 
  
                  let sql = 'INSERT INTO vari1values SET ?';
                  let query = db.query(sql, vari1values, (err, result) => {
                  if(err){
                    return sendError(res, "Not Exist!");
                  }
                  });
                }

                });
          }
          if(req.body.vari2.values.length > 0 && hasmixedvari != "true"){
            let vari2data = {pid:result.insertId,name: req.body.vari2.name}; 

                let sql = 'INSERT INTO vari2 SET ?';
                let query = db.query(sql, vari2data, (err, result) => {
                if(err){
                  return sendError(res, "Not Exist!");
                }
                for (let i = 0; i < req.body.vari2.values.length; i++) {

                  let vari2values = {
                      variid:result.insertId,
                      name: req.body.vari2.values[i].name,
                      price:req.body.vari2.values[i].price,
                      quantity:req.body.vari2.values[i].quantity,
                      sku:req.body.vari2.values[i].sku
                  }; 
  
                  let sql = 'INSERT INTO vari2values SET ?';
                  let query = db.query(sql, vari2values, (err, result) => {
                  if(err){
                    return sendError(res, "Not Exist!");
                  }
                  });
                }

                });
          }

          if(req.body.mixedvari.values.length > 0){
            let mixdata = {pid:result.insertId,vari1: req.body.mixedvari.vari1,vari2: req.body.mixedvari.vari2}; 

                let sql = 'INSERT INTO mixedvari SET ?';
                let query = db.query(sql, mixdata, (err, result) => {
                if(err){
                  return sendError(res, "Not Exist!");
                }
                for (let i = 0; i < req.body.mixedvari.values.length; i++) {

                  let mixedvalues = {
                      vid:result.insertId,
                      vari1name: req.body.mixedvari.values[i].vari1name,
                      vari2name: req.body.mixedvari.values[i].vari2name,
                      price:req.body.mixedvari.values[i].price,
                      quantity:req.body.mixedvari.values[i].quantity,
                      sku:req.body.mixedvari.values[i].sku
                  }; 
  
                  let sql = 'INSERT INTO mixvalues SET ?';
                  let query = db.query(sql, mixedvalues, (err, result) => {
                  if(err){
                    return sendError(res, "Not Exist!");
                  }
                  });
                }

                });
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

          res.send({
            success:true
          });

      });
  
  
  };













  exports.updateproduct = async (req, res, next) => {

    const con = await connection;

  
    const { id,cateid,subcateid,name, details,personalization,ispersonalization,sku, price,quantity,discount,file1,file2,file3,file4,file5,file6,file7,file8,
      hasvari1,
      hasprice1,
      hasquantity1,
      hasvari2,
      hasprice2,
      hasquantity2,
      hasmixedvari
     } = req.body;
  
     var tempprice = 0;

     if(req.body.hasmixedvari == 'true'){
      
      tempprice = req.body.mixedvari.values.sort((a, b) => Number(a.price) - Number(b.price))[0].price;

     }
     if(req.body.hasprice1 == 'true' && !req.body.hasmixedvari == 'true'){
      
      tempprice = req.body.vari1.values.sort((a, b) => Number(a.price) - Number(b.price))[0].price;

     }
     if(req.body.hasprice2 == 'true' && !req.body.hasmixedvari == 'true'){
      
      tempprice = req.body.vari2.values.sort((a, b) => Number(a.price) - Number(b.price))[0].price;

     }

     const [vari1data] = await con.execute('SELECT * FROM vari1 WHERE pid = ? ', [id]);
     if(vari1data.length > 0){
     let vari1values = `DELETE FROM  vari1values WHERE variid = ${vari1data[0].id}`;
     await db.query(vari1values, (err, result) => {
       if(err) throw err;

       console.log("delete",result);
     });
    }

     const [vari2data] = await con.execute('SELECT * FROM vari2 WHERE pid = ? ', [id]);
     if(vari2data.length > 0){
     let vari2values = `DELETE FROM  vari2values WHERE variid = ${vari2data[0].id}`;
     await db.query(vari2values, (err, result) => {
       if(err) throw err;

       console.log("delete",result);
     });
     }
     const [mixvari] = await con.execute('SELECT * FROM mixedvari WHERE pid = ? ', [id]);

     if(mixvari.length > 0){
      let mixvalues = `DELETE FROM  mixvalues WHERE vid = ${mixvari[0].id}`;
      await db.query(mixvalues, (err, result) => {
        if(err) throw err;
 
        console.log("delete",result);
      });
     }
       
       
     let sqlc = `DELETE FROM  vari1 WHERE pid = ${id}`;
     let queryc = db.query(sqlc, (err, result) => {
       if(err) throw err;

       console.log("delete",result);
     });

     let sqls = `DELETE FROM  vari2 WHERE pid = ${id}`;
     let querys = db.query(sqls, (err, result) => {
       if(err) throw err;
     });   
     
     let sqlm = `DELETE FROM  mixedvari WHERE pid = ${id}`;
     let querym = db.query(sqlm, (err, result) => {
       if(err) throw err;
     });
 
     if(req.body.vari1.values.length > 0 && hasmixedvari != "true"){


       await con.execute (
         "UPDATE products SET cateid = ?, subcateid = ?, sellerid = ?, name = ? , details = ? ,personalization = ?, ispersonalization = ? ,sku = ?, price = ? ,tempprice = ?, discount = ? , quantity = ? , file1 = ? , file2 = ?, file3 = ?, file4 = ?, file5 = ?, file6 = ?, file7 = ?, file8 = ?, hasvari1 = ?, hasvari2 = ?,hasprice1 = ?,hasquantity1 = ?,hasvari2 = ?,hasprice2 = ? ,hasquantity2 = ?,hasmixedvari = ?  WHERE id = ?", 
         [cateid,subcateid,req.user.id,name,details,personalization,ispersonalization,sku,price,tempprice,discount,quantity,file1,file2,file3,file4,file5,file6,file7,file8,hasvari1,hasvari2,hasprice1,hasquantity1,
          hasvari2,hasprice2,hasquantity2,
          hasmixedvari,id]
       ); 
         
            let vari1data = {pid:id,name: req.body.vari1.name}; 

            let sql = 'INSERT INTO vari1 SET ?';
            let query = db.query(sql, vari1data, (err, result) => {
            if(err){
              return sendError(res, "Not Exist!");
            }
            for (let i = 0; i < req.body.vari1.values.length; i++) {

              let vari1values = {
                  variid:result.insertId,
                  name: req.body.vari1.values[i].name,
                  price:req.body.vari1.values[i].price,
                  quantity:req.body.vari1.values[i].quantity,
                  sku:req.body.vari1.values[i].sku
              }; 

              let sql = 'INSERT INTO vari1values SET ?';
              let query = db.query(sql, vari1values, (err, result) => {
              if(err){
                return sendError(res, "Not Exist!");
              }
              });
            }

            });
      

     }

     if(req.body.vari2.values.length > 0 && hasmixedvari != "true"){

      await con.execute (
        "UPDATE products SET cateid = ?, subcateid = ?, sellerid = ?, name = ? , details = ? ,personalization = ?, ispersonalization = ? ,sku = ?, price = ? ,tempprice = ?, discount = ? , quantity = ? , file1 = ? , file2 = ?, file3 = ?, file4 = ?, file5 = ?, file6 = ?, file7 = ?, file8 = ?, hasvari1 = ?, hasvari2 = ?,hasprice1 = ?,hasquantity1 = ?,hasvari2 = ?,hasprice2 = ? ,hasquantity2 = ?,hasmixedvari = ?  WHERE id = ?", 
        [cateid,subcateid,req.user.id,name,details,personalization,ispersonalization,sku,price,tempprice,discount,quantity,file1,file2,file3,file4,file5,file6,file7,file8,hasvari1,hasvari2,hasprice1,hasquantity1,
         hasvari2,hasprice2,hasquantity2,
         hasmixedvari,id]
      );  
         
 
      let vari2data = {pid:id,name: req.body.vari1.name}; 

      let sql = 'INSERT INTO vari2 SET ?';
      let query = db.query(sql, vari2data, (err, result) => {
      if(err){
        return sendError(res, "Not Exist!");
      }
      for (let i = 0; i < req.body.vari1.values.length; i++) {

        let vari2values = {
            variid:result.insertId,
            name: req.body.vari1.values[i].name,
            price:req.body.vari1.values[i].price,
            quantity:req.body.vari1.values[i].quantity,
            sku:req.body.vari1.values[i].sku
        }; 

        let sql = 'INSERT INTO vari2values SET ?';
        let query = db.query(sql, vari2values, (err, result) => {
        if(err){
          return sendError(res, "Not Exist!");
        }
        });
      }

      });


       }

       if(req.body.mixedvari.values.length > 0){
        await con.execute (
          "UPDATE products SET cateid = ?, subcateid = ?, sellerid = ?, name = ? , details = ? ,personalization = ?, ispersonalization = ? ,sku = ?, price = ? ,tempprice = ?, discount = ? , quantity = ? , file1 = ? , file2 = ?, file3 = ?, file4 = ?, file5 = ?, file6 = ?, file7 = ?, file8 = ?, hasvari1 = ?, hasvari2 = ?,hasprice1 = ?,hasquantity1 = ?,hasvari2 = ?,hasprice2 = ? ,hasquantity2 = ?,hasmixedvari = ?  WHERE id = ?", 
          [cateid,subcateid,req.user.id,name,details,personalization,ispersonalization,sku,price,tempprice,discount,quantity,file1,file2,file3,file4,file5,file6,file7,file8,hasvari1,hasvari2,hasprice1,hasquantity1,
           hasvari2,hasprice2,hasquantity2,
           hasmixedvari,id]
        ); 


        let mixdata = {pid:id,vari1: req.body.mixedvari.vari1,vari2: req.body.mixedvari.vari2}; 

        let sql = 'INSERT INTO mixedvari SET ?';
        let query = db.query(sql, mixdata, (err, result) => {
        if(err){
          return sendError(res, "Not Exist!");
        }
        for (let i = 0; i < req.body.mixedvari.values.length; i++) {

          let mixedvalues = {
              vid:result.insertId,
              vari1name: req.body.mixedvari.values[i].vari1name,
              vari2name: req.body.mixedvari.values[i].vari2name,
              price:req.body.mixedvari.values[i].price,
              quantity:req.body.mixedvari.values[i].quantity,
              sku:req.body.mixedvari.values[i].sku
          }; 

          let sql = 'INSERT INTO mixvalues SET ?';
          let query = db.query(sql, mixedvalues, (err, result) => {
          if(err){
            return sendError(res, "Not Exist!");
          }
          });
        }

        });

       }


      if(req.body.vari1.values.length == 0 && req.body.vari2.values.length == 0 && req.body.mixedvari.values.length == 0){
       
        await con.execute (
          "UPDATE products SET cateid = ?, subcateid = ?, sellerid = ?, name = ? , details = ? ,personalization = ?, ispersonalization = ? ,sku = ?, price = ? ,tempprice = ?, discount = ? , quantity = ? , file1 = ? , file2 = ?, file3 = ?, file4 = ?, file5 = ?, file6 = ?, file7 = ?, file8 = ?, hasvari1 = ?, hasvari2 = ?,hasprice1 = ?,hasquantity1 = ?,hasvari2 = ?,hasprice2 = ? ,hasquantity2 = ?,hasmixedvari = ?  WHERE id = ?", 
          [cateid,subcateid,req.user.id,name,details,personalization,ispersonalization,sku,price,tempprice,discount,quantity,file1,file2,file3,file4,file5,file6,file7,file8,hasvari1,hasvari2,hasprice1,hasquantity1,
           hasvari2,hasprice2,hasquantity2,
           hasmixedvari,id]
        ); 
      
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


    res.send({
              success:true
            });
  


};