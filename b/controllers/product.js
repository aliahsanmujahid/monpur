
const db = require("../config/db");
const { sendError } = require("../utils/helper");
const fs = require('fs');
const connection = require("../config/db2");





exports.addfav = async (req, res, next) => {

  const con = await connection;

  let [data] = await con.execute('SELECT * FROM fav WHERE uid = ? and pid = ? ', [ req.params.uid,req.params.pid ]);
  
  if(data.length > 0){
    res.send({
      already:true
    }); 
  }else{
  await con.query (
    "INSERT INTO fav (uid,pid) VALUES (?,?)", 
    [ 
     req.params.uid,req.params.pid
    ]
  ); 

  res.send({
    success:true
  });
  }

};

exports.removefav = async (req, res, next) => {

  const con = await connection;
  
  await con.execute('DELETE FROM fav WHERE uid = ? and pid = ?', [ req.params.uid,req.params.pid ]);

  res.send({
    success:true
  }); 

};

exports.getfavp = async (req, res, next) => {

  const con = await connection;

  var numPerPage = 10;
  var skip = (req.params.page-1) * numPerPage; 
  var limit = skip + ',' + numPerPage;

  let [data] = await con.execute(`SELECT pid FROM fav WHERE uid = ? LIMIT ` + limit, [ req.params.uid ]);
  
  let fp = [];

  if(data.length > 0){

  for(let i = 0; i<data.length; i++){
    let [p] = await con.execute('SELECT * FROM products WHERE id = ? ', [ data[i].pid ]);
    fp.push(p[0]);
  }

  res.send(fp);

  }else{
    res.send([]); 
  }

};

exports.isfav = async (req, res, next) => {

  const con = await connection;

  let [data] = await con.execute('SELECT * FROM fav WHERE uid = ? and pid = ? ', [ req.params.uid,req.params.pid ]);
  
  if(data.length > 0){
    res.send({
      success:true
    });
  }else{
    res.send({
      success:false
    });
  }

};









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

exports.getmixedvari = async (req, res, next) => {

  const con = await connection;

  const [mixedvaridata] = await con.execute('SELECT * FROM mixedvari WHERE pid = ? ', [req.params.id]);

  const [mixvalues] = await con.execute('SELECT * FROM mixvalues WHERE vid = ? ', [mixedvaridata[0].id]);

  var mixedvari = {
          id:mixedvaridata[0].id,
          vari1: mixedvaridata[0].vari1,
          vari2: mixedvaridata[0].vari2,
          values:mixvalues
  }


  res.send(mixedvari);

};

exports.getvari = async (req, res, next) => {
  
  const con = await connection;
  const [varidata] = await con.execute('SELECT * FROM vari WHERE pid = ? ', [req.params.id]);
  if(varidata.length > 0){
  const [varivalues] = await con.execute('SELECT * FROM varivalues WHERE variid = ? ', [varidata[0].id]);
  var vari = {
    id:varidata[0].id,
    name: varidata[0].name,
    values:varivalues
  };
  res.send(vari);
  }

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
      var vari = {
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

      if(data.hasvari == "true"){
        const [varidata] = await con.execute('SELECT * FROM vari WHERE pid = ? ', [data.id]);
       
        if(varidata.length>0){
          const [varivalues] = await con.execute('SELECT * FROM varivalues WHERE variid = ? ', [varidata[0].id]);
          vari = {
            id:varidata[0].id,
            name: varidata[0].name,
            values:varivalues
          }
          data = {...data,mixedvari,vari}
        }
      }
      if(data.hasmixedvari == "true"){
        const [mixedvaridata] = await con.execute('SELECT * FROM mixedvari WHERE pid = ? ', [data.id]);

        const [mixvalues] = await con.execute('SELECT * FROM mixvalues WHERE vid = ? ', [mixedvaridata[0].id]);
        

        mixedvari = {
          id:mixedvaridata[0].id,
          vari1: mixedvaridata[0].vari1,
          vari2: mixedvaridata[0].vari2,
          values:mixvalues
        }

        data = {...data,mixedvari,vari}
     
      }

      res.send(data);        

      
    });
  

};























exports.createproduct = async (req, res, next) => {

    const { cateid,subcateid,name, details,personalization,isp,sku, price,quantity,discount,
      file1,file2,file3,file4,file5,file6,file7,file8,
      hasvari,hasmixedvari} = req.body;
  

    let product = {cateid:cateid,subcateid:subcateid,sellerid:req.user.id,name: name, details:details,
          personalization:personalization,isp:isp,sku:sku,
          price:price,discount:discount,quantity:quantity,
          file1:file1,
          file2:file2,file3:file3,file4:file4,file5:file5,file6:file6,
          file7:file7,file8:file8,
          hasvari:hasvari,
          hasmixedvari:hasmixedvari
        };

      let sql = 'INSERT INTO products SET ?';
      let query = db.query(sql, product, (err, result) => {
          if(err) throw err;
          console.log("product added");

          if(req.body.vari.values.length > 0){
            let vari1data = {pid:result.insertId,name: req.body.vari.name}; 

                let sql = 'INSERT INTO vari SET ?';
                let query = db.query(sql, vari1data, (err, result) => {
                if(err){
                  return sendError(res, "Not Exist!");
                }
                for (let i = 0; i < req.body.vari.values.length; i++) {

                  let varivalues = {
                      variid:result.insertId,
                      name: req.body.vari.values[i].name,
                      price:req.body.vari.values[i].price,
                      quantity:req.body.vari.values[i].quantity,
                      sku:req.body.vari.values[i].sku
                  }; 
  
                  let sql = 'INSERT INTO varivalues SET ?';
                  let query = db.query(sql, varivalues, (err, result) => {
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

  
    const { id,cateid,subcateid,name, details,personalization,isp,sku, price,quantity,discount,
      file1,file2,file3,file4,file5,file6,file7,file8,hasvari,hasmixedvari
     } = req.body;
  
    


     const [varidata] = await con.execute('SELECT * FROM vari WHERE pid = ? ', [id]);
     if(varidata.length > 0){
     let vari1values = `DELETE FROM  varivalues WHERE variid = ${varidata[0].id}`;
     await db.query(vari1values, (err, result) => {
       if(err) throw err;
     });
    }

    const [mixvari] = await con.execute('SELECT * FROM mixedvari WHERE pid = ? ', [id]);

     if(mixvari.length > 0){
      let mixvalues = `DELETE FROM  mixvalues WHERE vid = ${mixvari[0].id}`;
      await db.query(mixvalues, (err, result) => {
        if(err) throw err;
      });
     }
       
       
     //deleting vari
     let sqls = `DELETE FROM  vari WHERE pid = ${id}`;
     let querys = db.query(sqls, (err, result) => {
       if(err) throw err;
     });   
     
     let sqlm = `DELETE FROM  mixedvari WHERE pid = ${id}`;
     let querym = db.query(sqlm, (err, result) => {
       if(err) throw err;
     });



 
     if(req.body.vari.values.length > 0){


       await con.execute (
         "UPDATE products SET cateid = ?, subcateid = ?, sellerid = ?, name = ? , details = ? ,personalization = ?, isp = ? ,sku = ?, price = ? , discount = ? , quantity = ? , file1 = ? , file2 = ?, file3 = ?, file4 = ?, file5 = ?, file6 = ?, file7 = ?, file8 = ?, hasvari = ?, hasmixedvari = ?  WHERE id = ?", 
         [cateid,subcateid,req.user.id,name,details,personalization,isp,sku,price,discount,quantity,file1,file2,file3,file4,file5,file6,file7,file8,
          hasvari,hasmixedvari,id]
       ); 
         
            let varidata = {pid:id,name: req.body.vari.name}; 

            let sql = 'INSERT INTO vari SET ?';
            let query = db.query(sql, varidata, (err, result) => {
            if(err){
              return sendError(res, "Not Exist!");
            }
            for (let i = 0; i < req.body.vari.values.length; i++) {

              let varivalues = {
                  variid:result.insertId,
                  name: req.body.vari.values[i].name,
                  price:req.body.vari.values[i].price,
                  quantity:req.body.vari.values[i].quantity,
                  sku:req.body.vari.values[i].sku
              }; 

              let sql = 'INSERT INTO varivalues SET ?';
              let query = db.query(sql, varivalues, (err, result) => {
              if(err){
                return sendError(res, "Not Exist!");
              }
              });
            }

            });
      

     }

    if(req.body.mixedvari.values.length > 0){

      await con.execute (
        "UPDATE products SET cateid = ?, subcateid = ?, sellerid = ?, name = ? , details = ? ,personalization = ?, isp = ? ,sku = ?, price = ? , discount = ? , quantity = ? , file1 = ? , file2 = ?, file3 = ?, file4 = ?, file5 = ?, file6 = ?, file7 = ?, file8 = ?, hasvari = ?, hasmixedvari = ?  WHERE id = ?", 
        [cateid,subcateid,req.user.id,name,details,personalization,isp,sku,price,discount,quantity,file1,file2,file3,file4,file5,file6,file7,file8,
         hasvari,hasmixedvari,id]
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


      if(req.body.vari.values.length == 0 && req.body.mixedvari.values.length == 0){
       
        await con.execute (
          "UPDATE products SET cateid = ?, subcateid = ?, sellerid = ?, name = ? , details = ? ,personalization = ?, isp = ? ,sku = ?, price = ? , discount = ? , quantity = ? , file1 = ? , file2 = ?, file3 = ?, file4 = ?, file5 = ?, file6 = ?, file7 = ?, file8 = ?, hasvari = ?, hasmixedvari = ?  WHERE id = ?", 
          [cateid,subcateid,req.user.id,name,details,personalization,isp,sku,price,discount,quantity,file1,file2,file3,file4,file5,file6,file7,file8,
           hasvari,hasmixedvari,id]
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