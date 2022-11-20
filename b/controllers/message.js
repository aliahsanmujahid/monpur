const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/helper");
const fs = require('fs');
const connection = require("../config/db2");






exports.createchat = async (req, res, next) => {

  const { senderid, receiverid } = req.body;

  if(senderid == receiverid){
    return sendError(res, "Same Chat Not Allowed");
  }

  let sql1 = `SELECT * FROM chat WHERE (senderid = ${senderid} && receiverid = ${receiverid}) || (senderid = ${receiverid} && receiverid = ${senderid})`;

                  let query1 = db.query(sql1, (err, result) => {
                    if(err) throw err;
                    if(result.length !== 0){
                      console.log("chat exist");
                      res.send(result);
                    }else{
                      console.log("cretting chat");

                      const date = new Date();
                      // flag1:0,flag2:0,unread:0

                      let data = {senderid: senderid, receiverid:receiverid,date:date };

                      let sql = 'INSERT INTO chat SET ?';
                      let query = db.query(sql, data, (err, result) => {

                      if(err) throw err;
                        console.log("chat added");

                      let chatwatchdata = {chatid: result.insertId, userid:senderid,flag:0,unread:0 };
                      let chatwatch = 'INSERT INTO chatwatch SET ?';
                      db.query(chatwatch, chatwatchdata, (err, result) => {
                      if(err) throw err;
                        console.log("chat added");
                      });
                      
                      let chatwatchdata2 = {chatid: result.insertId, userid:receiverid,flag:0,unread:0 };
                      let chatwatch2 = 'INSERT INTO chatwatch SET ?';
                      db.query(chatwatch2, chatwatchdata2, (err, result) => {
                      if(err) throw err;
                        console.log("chat added");
                      }); 


                        let sql = `SELECT * FROM chat WHERE id = ${result.insertId}`;
                                  let query = db.query(sql, (err, result) => {
                                    if(err) throw err;
                                      res.send(result);
                                });
                      });    
                    }
                });


};


exports.haschat = async (req, res, next) => {

  const { senderid, receiverid } = req.body;

  // console.log("haschat res",senderid, receiverid);

  if(senderid == receiverid){
    return sendError(res, "Same Chat Not Allowed");
  }

  let sql1 = `SELECT * FROM chat WHERE (senderid = ${senderid} && receiverid = ${receiverid}) || (senderid = ${receiverid} && receiverid = ${senderid})`;
                  let query1 = db.query(sql1, (err, result) => {
                    if(err) throw err;
                    if(result.length !== 0){
                      // console.log("has chat");
                      // let sql = `SELECT * FROM message WHERE chatid = ${result[0].id}`;
                      // let query = db.query(sql, (err, result) => {
                      //   if(err) throw err;
                      //     res.send(result);
                      // }); 
                      res.send(result);

                    }else{
                      return sendError(res, "Chat Not exists");
                    }
                });
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
  
  const  userId  = req.params.id;
  const con = await connection;

  const [result] = await con.execute(`SELECT chat.id,chat.senderid,chat.receiverid,chat.date,chatwatch.flag,chatwatch.unread FROM chat JOIN  chatwatch on chatwatch.chatid = chat.id WHERE chatwatch.userid = ${userId}  ORDER BY chat.date DESC limit 1`);
      
  
  res.send(result);
                          

};

exports.getflagchats = async (req, res, next) => {

    const  userId  = req.params.id;

    const con = await connection;

    const [result] = await con.execute(`SELECT chat.id,chat.senderid,chat.receiverid,chat.date,chatwatch.flag,chatwatch.unread FROM chat JOIN  chatwatch on chatwatch.chatid = chat.id WHERE chatwatch.userid = ${userId} && chatwatch.flag = 1`);
        
    
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


  var numPerPage = 10;
  var skip = (1-1) * numPerPage; 
  var limit = skip + ',' + numPerPage;

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









