const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/helper");
const fs = require('fs');
const connection = require("../config/db2");






exports.createchat = async (req, res, next) => {

  const con = await connection;

  const { senderid, receiverid } = req.body;

  if(senderid == receiverid){
    return sendError(res,{
      same:true,
    });
  }

  let [data] = await con.execute('SELECT * FROM chat WHERE (senderid = ? && receiverid = ?) || (senderid = ? && receiverid = ?)', [senderid,receiverid,receiverid,senderid]);

  if(data.length !== 0){
    
    res.send(data);

  }else{
    const date = new Date();

    const chatr = await con.query (
      "INSERT INTO chat (senderid,receiverid,date) VALUES (?,?,?)", 
      [ 
        senderid,receiverid,date
      ]
    );
    await con.query (
      "INSERT INTO chatwatch (chatid,userid,flag,unread) VALUES (?,?,?,?)", 
      [ 
        chatr[0].insertId,senderid,0,0
      ]
    );
    await con.query (
      "INSERT INTO chatwatch (chatid,userid,flag,unread) VALUES (?,?,?,?)", 
      [ 
        chatr[0].insertId,receiverid,0,0
      ]
    );

    let [data] = await con.execute('SELECT * FROM chat WHERE id = ?', [chatr[0].insertId]);

    res.send(data);
  }

};


exports.haschat = async (req, res, next) => {


  const con = await connection;

  const { senderid, receiverid } = req.body;


  if(senderid == receiverid){
    return sendError(res,{
      same:true,
    });
  }

  let [data] = await con.execute('SELECT * FROM chat WHERE (senderid = ? && receiverid = ?) || (senderid = ? && receiverid = ?)', [senderid,receiverid,receiverid,senderid]);

  if(data.length !== 0){ 
    res.send(data);

  }else{

    return sendError(res, "Chat Not exists");

  }

};


exports.makezero = async (req, res, next) => {

  console.log("making zero",req.body)
  const con = await connection;
  const { chatid,userid  } = req.body;

  var sqle = `UPDATE chatwatch SET unread = 0 WHERE chatid = ? && userid = ?`;

  con.query(sqle, [chatid,userid], function (err, result) {
                  if (err){
                    return sendError(res, "Not Exist!");
  };
               
  });

}

exports.createmessege = async (req, res, next) => {

  const con = await connection;
  const { chatid, senderid,receiverid, message  } = req.body;

  var date = new Date();
  
  // console.log(chatid);


  let data = {chatid: chatid, senderid:senderid, message: message,date:date};

                      let sql = 'INSERT INTO message SET ?';
                      let query = db.query(sql, data, async (err, result) => {

                      if(err) throw err;   
                     
                      var sqle = `UPDATE chatwatch SET unread = unread + 1 WHERE chatid = ? && userid = ?`;
                                
                      con.query(sqle, [chatid,receiverid], function (err, result) {
                                      if (err){
                                        return sendError(res, "Not Exist!");
                      };
                                      
                      });


        

                        let sql = `SELECT * FROM message WHERE id = ${result.insertId}`;
                                  let query = db.query(sql, (err, result) => {
                                    if(err) throw err;
                                    

                                  

                                    var sqle = `UPDATE chat SET date = "${result[0].date}" WHERE id = ?`;
                                    con.query(sqle, [chatid], function (err, result) {
                                      if (err){
                                        return sendError(res, "Not Exist!");
                                      };
                                      
                                    });
                                    
                                    res.send(result[0]);
                                });
                      });  
};


exports.getchats = async (req, res, next) => {
  
  const con = await connection;

  const  userId  = req.params.id;
  const  page  = req.params.page;

  var numPerPage = 10;
  var skip = (page-1) * numPerPage; 
  var limit = skip + ',' + numPerPage;


  const [result] = 
  await con.execute(`SELECT chat.id,chat.senderid,chat.receiverid,chat.date,chatwatch.flag,chatwatch.unread FROM chat JOIN  chatwatch on chatwatch.chatid = chat.id WHERE chatwatch.userid = ? ORDER BY chat.date DESC LIMIT ` + limit, [userId]);
  
  // console.log("chat",result);
  
  res.send(result);
                          

};

exports.getflagchats = async (req, res, next) => {

    const con = await connection;

    const  userId  = req.params.id;
    const  page  = req.params.page;
  
    var numPerPage = 10;
    var skip = (page-1) * numPerPage; 
    var limit = skip + ',' + numPerPage;
  

    const [result] = await con.execute(`SELECT chat.id,chat.senderid,chat.receiverid,chat.date,chatwatch.flag,chatwatch.unread FROM chat JOIN  chatwatch on chatwatch.chatid = chat.id WHERE chatwatch.userid = ? && chatwatch.flag = 1 ORDER BY chat.date DESC LIMIT ` + limit, [userId]);    
    
    res.send(result);                     
  
  };

exports.flagchat = async (req, res, next) => {

    // console.log(req.body);
  
    const con = await connection;

    const  chatid  = req.body.chatid;
    const  userid  = req.body.userid;
  
    var sqle = `UPDATE chatwatch SET flag = 1 WHERE chatid = ? && userid = ?`;
              con.query(sqle, [chatid,userid], function (err, result) {
                if (err){
                  return sendError(res, "Not Exist!");
                };
        });   
    
    res.send({
          flaged:true
          });                        
  
};

exports.unflagchat = async (req, res, next) => {


  const con = await connection;

  const  chatid  = req.body.chatid;
  const  userid  = req.body.userid;

  // console.log("chatid",chatid,"userid",userid);

  var sqle = `UPDATE chatwatch SET flag = 0 WHERE chatid = ? && userid = ?`;
              con.query(sqle, [chatid,userid], function (err, result) {
                if (err){
                  return sendError(res, "Not Exist!");
                };
    }); 

    res.send({
      unflaged:true
      });

};

exports.getmessages = async (req, res, next) => {

  const con = await connection;
  const  chatid  = req.params.chatid;
  const  userid  = req.params.userid;
  const  page  = req.params.page;

  var numPerPage = 10;
  var skip = (page-1) * numPerPage; 
  var limit = skip + ',' + numPerPage;

  console.log("limit",limit,page);

  let sql = `SELECT * FROM message WHERE chatid = ${chatid} ORDER BY id DESC LIMIT ` + limit ;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
      
      
    var sqle = `UPDATE chatwatch SET unread = 0 WHERE chatid = ? && userid = ?`;
                                    con.query(sqle, [chatid,userid], function (err, result) {
                                      if (err){
                                        return sendError(res, "Not Exist!");
                                      };
                                      
                                    });

      res.send(result);
  });   

};









