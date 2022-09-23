const db = require("../config/db");
const { sendError } = require("../utils/helper");
const connection = require("../config/db2");


exports.getCustomerOrders = async (req, res, next) => {

  const con = await connection;
  var data = [];

  const [result] = await con.execute('SELECT * FROM orders WHERE customerid = ? ', [req.user.id]);
  

  for(let i=0;i<result.length;i++){

  const [orderItems] = await con.execute('SELECT * FROM orderitems WHERE orderid = ? ', [result[i].id]);
  data.push({...result[i],orderItems});

  }
  

  res.send(data);

}


exports.getSellerOrders = async (req, res, next) => {

      const con = await connection;
      var data = [];

      const [result] = await con.execute('SELECT * FROM orders WHERE sellerid = ? ', [req.user.id]);
      

      for(let i=0;i<result.length;i++){

      const [orderItems] = await con.execute('SELECT * FROM orderitems WHERE orderid = ? ', [result[i].id]);
      data.push({...result[i],orderItems});

      }
      

      res.send(data);

}

exports.createorder = async (req, res, next) => {
    console.log("urder",req.body)

    const con = await connection;
    const orderitems = req.body.orderItems;
    const newitems = []
  
  
  
    for (let i = 0; i < orderitems.length; i++) {
  
      const [data] = await con.execute('SELECT * FROM products WHERE id = ? ', [ orderitems[i].id ]);
      newitems.push(data[0])
  
    }
  
  
    const resultInsert = await con.query (
      "INSERT INTO orders (name, phone,address,district,upazila,status,customerid,sellerid) VALUES (?,?,?,?,?,?,?,?)", 
      [req.body.name,req.body.phone,req.body.address,req.body.district,req.body.upazila,"pending",req.user.id,req.body.sellerid]
    );
  
    //console.log(newitems)
  
  
    for (let i = 0; i < newitems.length; i++) {
  
       // console.log("newitems",newitems);
  
          let sql2 = `INSERT INTO orderitems SET ?`;
    
          let orderitem = {
            pid: newitems[i].id,
            orderid: resultInsert[0].insertId,
            name:newitems[i].name,
            price:newitems[i].discprice,
            totalprice:newitems[i].discprice*orderitems[i].quantity,
            color:orderitems[i].color_name,
            variname:orderitems[i].vari_name,
            vari:orderitems[i].size_name,
            quantity:orderitems[i].quantity,
          };
    
          let query = await db.query(sql2, orderitem, async (err, result) => {
                    if(err){
                      return sendError(res, "Not Exist!");
                    }
                        
                    if(result){

                      var sqle = `UPDATE products SET qty = qty - ${orderitems[i].quantity}  WHERE id = ?`;
                      con.query(sqle, [newitems[i].id], function (err, result) {
                        if (err){
                          return sendError(res, "Not Exist!");
                        };
                        
                      });
                      if(orderitems[i].color_id !== 0){
                        const [data] = await con.execute('SELECT * FROM colors WHERE id = ? ', [ orderitems[i].color_id ]);
                        
                        console.log("colors",data[0])
                        var sqle = `UPDATE colors SET quantity = quantity - ${orderitems[i].quantity}  WHERE id = ?`;
                        con.query(sqle, [orderitems[i].color_id], function (err, result) {
                        if (err){
                          return sendError(res, "Not Exist!");
                        };
                        
                      });
                      }
                      if(orderitems[i].size_id !== 0){
                        const [data] = await con.execute('SELECT * FROM sizes WHERE id = ? ', [ orderitems[i].size_id ]);
                        console.log("sizes",data[0])
                        var sqle = `UPDATE sizes SET quantity = quantity - ${orderitems[i].quantity}  WHERE id = ?`;
                        con.query(sqle, [orderitems[i].size_id], function (err, result) {
                        if (err){
                          return sendError(res, "Not Exist!");
                        };
                        
                      });
                      }


                    }  
                             
          });
        }
  
        res.send({
            success:true
          });
  
  
  
  
  };