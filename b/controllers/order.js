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


exports.searchorder = async (req, res, next) => {

  const con = await connection;
  var data = [];
  var oid = req.params.oid;
  var uid = req.params.uid;

  const [result] = await con.execute('SELECT * FROM orders WHERE id = ? ', [oid]);

  if(result[0]){

    if(result[0].sellerid.toString() !== uid){
      return sendError(res, "Not Exist!");
    }
    const [orderItems] = await con.execute('SELECT * FROM orderitems WHERE orderid = ? ', [result[0].id]);
    data.push({...result[0],orderItems});

     res.send(data);  
  } else{
    return sendError(res, "Not Exist!");
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











// createorder Section
exports.createorder = async (req, res, next) => {

    const con = await connection;
    const orderitems = req.body.orderItems;
    
    var newitems = []
  
    for (let i = 0; i < orderitems.length; i++) {
  
      let [data] = await con.execute('SELECT * FROM products WHERE id = ? ', [ orderitems[i].id ]);

      if(orderitems[i].vari.values.length == 0 && orderitems[i].mixedvari.values.length == 0){
        newitems.push({...data[0]});
      }
      //vari
      if(orderitems[i].vari.values.length > 0){
        let id = orderitems[i].vari.values[0].id;

        if(orderitems[i].vari.values[0].quantity != null){
          await con.execute (
            "UPDATE varivalues SET quantity = quantity - ? WHERE id = ?", 
            [orderitems[i].quantity,id]
            );
        }
        const [varivalues] = await con.execute('SELECT * FROM varivalues WHERE id = ? ', [id]);
        var vari = varivalues[0];
        newitems.push({...data[0],vari});
      }
      //maxvari
      if(orderitems[i].mixedvari.values.length > 0){
        let id = orderitems[i].mixedvari.values[0].id;

        if(orderitems[i].mixedvari.values[0].quantity != null){
          await con.execute (
            "UPDATE mixvalues SET quantity = quantity - ? WHERE id = ?", 
            [orderitems[i].quantity,id]
            );
        }
        const [mixvalues] = await con.execute('SELECT * FROM mixvalues WHERE id = ? ', [id]);
        var mix = mixvalues[0];
        newitems.push({...data[0],mix});
      }


    }

    var delevary = 0;
    var cuponv = 0;
    var subtotal = 0;
    var alltotal = 0;


    let [shiping] = await con.execute('SELECT * FROM shiping WHERE id = ? ', [req.body.shipingid]);


    if(req.body.couponid != null){
      let [cupondata] = await con.execute('SELECT * FROM coupon WHERE id = ? ', [req.body.couponid]);
      
      cuponv = cupondata[0]?.value;
    }

    console.log("newitems",newitems);

    for (let i = 0; i < newitems.length; i++) {

      if(!newitems[i].vari && !newitems[i].mix){
        dprice = Number((newitems[i].price * ( (100-newitems[i].discount) / 100 )).toFixed(0));
        var temp = Number(((dprice)*orderitems[i].quantity)?.toFixed(0));

        subtotal = subtotal + temp;
        console.log("price ",subtotal);
      }

      if(newitems[i].vari){
        dprice = Number((newitems[i].vari.price * ( (100-newitems[i].discount) / 100 )).toFixed(0));
        var temp = Number(((dprice)*orderitems[i].quantity)?.toFixed(0));

        subtotal = subtotal + temp;
        console.log("vari ",subtotal);

      }

      if(newitems[i].mix){
        dprice = Number((newitems[i].mix.price * ( (100-newitems[i].discount) / 100 )).toFixed(0));
        var temp = Number(((dprice)*orderitems[i].quantity)?.toFixed(0));

        subtotal = subtotal + temp;
        console.log("mix ",subtotal);
      }

    }

    delevary = shiping[0].value;
    alltotal = (delevary+subtotal)-cuponv;
  
    const resultInsert = await con.query (
      "INSERT INTO orders (email,message,name, phone,address,city,state,zip,status,customerid,sellerid,dtitle,dvalue,ctitle,cvalue,subtotal,total,ispaid,cashondelevary,paidbypaypal,paidbystripe) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
      [ 
        req.body.email,req.body.message,req.body.name,req.body.phone,
        req.body.address,req.body.city,req.body.state,req.body.zip,
        "Pending",req.user.id,req.body.sellerid,
        req.body.shiptitle,delevary,req.body.coupontitle,req.body.coupon,subtotal,alltotal,0,0,0,0
      ]
    );
  
  
    for (let i = 0; i < newitems.length; i++) {

      if(!newitems[i].vari && !newitems[i].mix){
        let price = Number((newitems[i].price * ( (100-newitems[i].discount) / 100 )).toFixed(0));
        await con.query (
          "INSERT INTO orderitems (pid,orderid,isr,name,img,price,quantity) VALUES (?,?,?,?,?,?,?)", 
          [ 
            newitems[i].id,resultInsert[0].insertId,0,newitems[i].name,newitems[i].file1,price,orderitems[i].quantity
          ]
        );
      }

      if(newitems[i].vari){
        let price = Number((newitems[i].vari.price * ( (100-newitems[i].discount) / 100 )).toFixed(0));
        await con.query (
          "INSERT INTO orderitems (pid,orderid,isr,name,img,price,quantity) VALUES (?,?,?,?,?,?,?)", 
          [ 
            newitems[i].id,resultInsert[0].insertId,0,newitems[i].name,newitems[i].file1,price,orderitems[i].quantity
          ]
        );

      }

      if(newitems[i].mix){

        let price = Number((newitems[i].mix.price * ( (100-newitems[i].discount) / 100 )).toFixed(0));

        await con.query (
          "INSERT INTO orderitems (pid,orderid,isr,name,img,price,quantity) VALUES (?,?,?,?,?,?,?)", 
          [ 
            newitems[i].id,resultInsert[0].insertId,0,newitems[i].name,newitems[i].file1,price,orderitems[i].quantity
          ]
        );
      }

    




    }
  
    res.send({
          success:true,
          orderid:resultInsert[0].insertId
        });     
  
  };



