const db = require("../config/db");

exports.createuser = async (req, res) => {
    let sql = 
       'CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), pnumber VARCHAR(255),image VARCHAR(255), password VARCHAR(255),isVerified VARCHAR(255),role VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("user table creatd");
        res.send('user table creatd');
    });
};

exports.createproduct = async (req, res) => {
    let sql = 
       'CREATE TABLE products(id int AUTO_INCREMENT,sellerid int,cateid int,subcateid int, name VARCHAR(255), details VARCHAR(255),orgprice int,discprice int, qty int, file1 VARCHAR(255),file2 VARCHAR(255),file3 VARCHAR(255),file4 VARCHAR(255), file5 VARCHAR(255),file6 VARCHAR(255),file7 VARCHAR(255),file8 VARCHAR(255),hassize VARCHAR(255),hascolor VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("product table creatd");
        res.send('product table creatd');
    });
};

exports.imagewatch = async (req, res) => {
    let sql = 
       'CREATE TABLE imgwatch(id int AUTO_INCREMENT, url VARCHAR(255), userId VARCHAR(255),issaved VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("imagewatch table creatd");
        res.send('imagewatch table creatd');
    });
};

exports.chat = async (req, res) => {
    // flag1 int,flag2 int, unread int
    let sql = 
       'CREATE TABLE chat(id int AUTO_INCREMENT,senderid int, receiverid int, date VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("chat table creatd");
        res.send('chat table creatd');
    });
};

exports.chatwatch = async (req, res) => {
    let sql = 
       'CREATE TABLE chatwatch(id int AUTO_INCREMENT,chatid int, userid int,flag int,unread int ,PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("chatwatch table creatd");
        res.send('chatwatch table creatd');
    });
};

exports.message = async (req, res) => {
    let sql = 
       'CREATE TABLE message(id int AUTO_INCREMENT, chatid int, senderid int, message VARCHAR(255),date VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("message table creatd");
        res.send('message table creatd');
    });
};

exports.orders = async (req, res) => {
    let sql = 
       'CREATE TABLE orders(id int AUTO_INCREMENT, name VARCHAR(255), phone VARCHAR(255),address VARCHAR(255),district VARCHAR(255),upazila VARCHAR(255),delivery VARCHAR(255),subtotal VARCHAR(255),total VARCHAR(255),status VARCHAR(255),customerid int,sellerid int,PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("orders table creatd");
        res.send('orders table creatd');
    });
};

exports.orderitems = async (req, res) => {
    let sql = 
       'CREATE TABLE orderitems(id int AUTO_INCREMENT, pid int, orderid int,name VARCHAR(255), price int,quantity int,totalprice int,color VARCHAR(255),variname VARCHAR(255),vari VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("orderitems table creatd");
        res.send('orderitems table creatd');
    });
};

exports.otpcheck = async (req, res) => {
    let sql = 
       'CREATE TABLE otpcheck(id int AUTO_INCREMENT, pnumber int,otp int,date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("otpcheck table creatd");
        res.send('otpcheck table creatd');
    });
};

exports.sizes = async (req, res) => {
    let sql = 
       'CREATE TABLE sizes(id int AUTO_INCREMENT, pid int,name VARCHAR(255),variCode VARCHAR(255),quantity int,PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("otpcheck table creatd");
        res.send('otpcheck table creatd');
    });
};

exports.colors = async (req, res) => {
    let sql = 
       'CREATE TABLE colors(id int AUTO_INCREMENT, pid int,name VARCHAR(255),colorCode VARCHAR(255),quantity int,PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("otpcheck table creatd");
        res.send('otpcheck table creatd');
    });
};


exports.cate = async (req, res) => {
    let sql = 
       'CREATE TABLE cate(id int AUTO_INCREMENT,name VARCHAR(255),image VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("otpcheck table creatd");
        res.send('otpcheck table creatd');
    });
};


exports.subcate = async (req, res) => {
    let sql = 
       'CREATE TABLE subcate(id int AUTO_INCREMENT, cateid int,name VARCHAR(255),image VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("otpcheck table creatd");
        res.send('otpcheck table creatd');
    });
};


exports.reviews = async (req, res) => {
    let sql = 
       'CREATE TABLE reviews(id int AUTO_INCREMENT, pid int,ratting int,review VARCHAR(255),image1 VARCHAR(255),image2 VARCHAR(255),image3 VARCHAR(255),image4 VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("otpcheck table creatd");
        res.send('otpcheck table creatd');
    });
};





