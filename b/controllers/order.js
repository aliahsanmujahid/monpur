const db = require("../config/db");
const { sendError } = require("../utils/helper");
const connection = require("../config/db2");

exports.setcod = async (req, res, next) => {
  const con = await connection;

  const resultInsert = await con.execute (
    "UPDATE orders SET ispaid = ?,cashondelevary = ? WHERE id = ?", 
    [0,1,req.params.id]
  );

  if(resultInsert[0].affectedRows == 1){
    res.send({
      success:true
    });    
  }
  else{
    return sendError(res, "Problem to Set Order!");
  }     
                      

}


exports.setpaypal = async (req, res, next) => {
  const con = await connection;

  const resultInsert = await con.execute (
    "UPDATE orders SET ispaid = ?,paidbypaypal = ? WHERE id = ?", 
    [1,1,req.params.id]
  );

  if(resultInsert[0].affectedRows == 1){
    res.send({
      success:true
    });    
  }
  else{
    return sendError(res, "Problem to Set Order!");
  }                   

}


exports.setstripe = async (req, res, next) => {
  const con = await connection;
  const ww = 'sk_test_51Lyl0HGLWGTnKxnYFEL7eC1XntnYazo3fkWLNpiSOJLTsRj71n97BDprYLnmVIM8CCWq7tDIKn2vdo5ITVo3JoO000QQfuH4LH'
  const stripe = require('stripe')(ww);

  // console.log(req.body);

  const [result] = await con.execute('SELECT * FROM orders WHERE id = ? ', [req.body.orderid]);
  
  // console.log(result);
  



  stripe.customers.create({
        email: req.body.token.email,
        source: req.body.token.id,
        // name: 'Gourav Hammad',
        // address: {
        //     line1: 'TC 9/4 Old MES colony',
        //     postal_code: '452331',
        //     city: 'Indore',
        //     state: 'Madhya Pradesh',
        //     country: 'India',
        // }
    })
    .then((customer) => {
        return stripe.charges.create({
            amount: result[0].total * 100,   
            description: 'Order Id: '+result[0].id,
            currency: 'USD',
            customer: customer.id
        });
    })
    .then(async (charge) => {
        
      const resultInsert = await con.execute (
        "UPDATE orders SET ispaid = ?,paidbystripe = ? WHERE id = ?", 
        [1,1,req.body.orderid]
      );
    
      if(resultInsert[0].affectedRows == 1){
        res.send({
          success:true
        });    
      }
      else{
        return sendError(res, "Problem to Set Order!");
      }  

    })
    .catch((err) => {
        res.send({
           success:false
        });
    });
     
                      

}


exports.changestatus = async (req, res, next) => {
  const con = await connection;

  const resultInsert = await con.execute (
    "UPDATE orders SET status = ? WHERE id = ?", 
    [req.params.status,req.params.id]
  );

  if(resultInsert[0].affectedRows == 1){
    res.send({
      success:true
    });    
  }
  else{
    return sendError(res, "Problem to Set Order!");
  }     
                      

}

exports.getorderbyid = async (req, res, next) => {

  const con = await connection;
  var data = [];

  const [result] = await con.execute('SELECT * FROM orders WHERE id = ? ', [req.params.id]);

  if(result[0]){
    const [orderItems] = await con.execute('SELECT * FROM orderitems WHERE orderid = ? ', [result[0].id]);
    data.push({...result[0],orderItems});

     res.send(data[0]);  
  } else{
    return sendError(res, "Not Exist!");
  }

}


exports.getorderbystatus = async (req, res, next) => {

  const con = await connection;
  var data = [];

  const [result] = await con.execute('SELECT * FROM orders WHERE status = ? ', [req.params.status]);
  
  if(result.length > 0){
   for(let i=0;i<result.length;i++){

    const [orderItems] = await con.execute('SELECT * FROM orderitems WHERE orderid = ? ', [result[i].id]);
    data.push({...result[i],orderItems});
  
   }
   res.send(data);
  }else{
      return sendError(res, "Not Exist!");
  }
    

}

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

    const con = await connection;
    const orderitems = req.body.orderItems;
    const newitems = []

    var delevary = 50;
    var subtotal = 0;
  
  
  
    for (let i = 0; i < orderitems.length; i++) {
  
      const [data] = await con.execute('SELECT * FROM products WHERE id = ? ', [ orderitems[i].id ]);
     
      var temp = data[0].discprice*orderitems[i].quantity;
      subtotal = subtotal + temp;
      
      newitems.push(data[0])
  
    }

    // for (let i = 0; i < newitems.length; i++) {
      
    //   var temp = newitems[i].discprice*orderitems[i].quantity;
    //   subtotal = subtotal + temp;

    // }
  
  
    const resultInsert = await con.query (
      "INSERT INTO orders (email,message,name, phone,address,city,state,zip,status,customerid,sellerid,delivery,subtotal,total,ispaid,cashondelevary,paidbypaypal,paidbystripe) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
      [ 
        req.body.email,req.body.message,req.body.name,req.body.phone,
        req.body.address,req.body.city,req.body.state,req.body.zip,
        "Pending",req.user.id,req.body.sellerid,delevary,
        subtotal,delevary+subtotal,0,0,0,0
      ]
    );
  
    //console.log(newitems)
  
  
    for (let i = 0; i < newitems.length; i++) {
  
       // console.log("newitems",newitems);
  
          let sql2 = `INSERT INTO orderitems SET ?`;
    
          let orderitem = {
            pid: newitems[i].id,
            orderid: resultInsert[0].insertId,
            name:newitems[i].name,
            img:newitems[i].file1,
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
            success:true,
            orderid:resultInsert[0].insertId
          });
  
  
  
  
  };

