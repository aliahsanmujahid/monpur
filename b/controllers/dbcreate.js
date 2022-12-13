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


exports.address = async (req, res) => {
    let sql = 
       'CREATE TABLE address(id int AUTO_INCREMENT,uid int,name VARCHAR(255), phone VARCHAR(255), email VARCHAR(255),address VARCHAR(255),city VARCHAR(255),state VARCHAR(255),zip VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("orders table creatd");
        res.send('orders table creatd');
    });
};





exports.createproduct = async (req, res) => {
    let sql = 
       'CREATE TABLE products(id int AUTO_INCREMENT,sellerid int,cateid int,subcateid int, name VARCHAR(255), details VARCHAR(700),personalization VARCHAR(255),isp VARCHAR(255),sku VARCHAR(255),price int,discount int, quantity int, file1 VARCHAR(255),file2 VARCHAR(255),file3 VARCHAR(255),file4 VARCHAR(255), file5 VARCHAR(255),file6 VARCHAR(255),file7 VARCHAR(255),file8 VARCHAR(255),hasvari VARCHAR(255),hasmixedvari VARCHAR(255),PRIMARY KEY(id))';
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


exports.orders = async (req, res) => {
    let sql = 
       'CREATE TABLE orders(id int AUTO_INCREMENT, name VARCHAR(255), phone VARCHAR(255), email VARCHAR(255),message VARCHAR(255),address VARCHAR(255),city VARCHAR(255),state VARCHAR(255),zip VARCHAR(255),dtitle VARCHAR(255),dvalue int,ctitle VARCHAR(255),cvalue int,subtotal int,total int,status VARCHAR(255),customerid int,sellerid int,ispaid int,cashondelevary int,paidbypaypal int,paidbystripe int,PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("orders table creatd");
        res.send('orders table creatd');
    });
};

exports.orderitems = async (req, res) => {
    let sql = 
       'CREATE TABLE orderitems(id int AUTO_INCREMENT, pid int, orderid int,name VARCHAR(255),img VARCHAR(255), price int,quantity int,totalprice int,sku VARCHAR(255),personalization VARCHAR(255),vari VARCHAR(255),PRIMARY KEY(id))';
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










exports.vari = async (req, res) => {
    let sql = 
       'CREATE TABLE vari(id int AUTO_INCREMENT, pid int,name VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("vari1 table creatd");
        res.send('vari1 table creatd');
    });
};

exports.mixedvari = async (req, res) => {
    let sql = 
       'CREATE TABLE mixedvari(id int AUTO_INCREMENT, pid int,vari1 VARCHAR(255),vari2 VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("vari2 table creatd");
        res.send('vari2 table creatd');
    });
};
exports.varivalues = async (req, res) => {
    let sql = 
       'CREATE TABLE varivalues(id int AUTO_INCREMENT, variid int,name VARCHAR(255), price int, quantity int,sku VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("varivalues table creatd");
        res.send('varivalues table creatd');
    });
};

exports.mixvalues = async (req, res) => {
    let sql = 
       'CREATE TABLE mixvalues(id int AUTO_INCREMENT, vid int,vari1name VARCHAR(255),vari2name VARCHAR(255), price int, quantity int,sku VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("varivalues table creatd");
        res.send('varivalues table creatd');
    });
};








exports.paymentsetting = async (req, res) => {
    let sql = 
       'CREATE TABLE paymentsetting(id int AUTO_INCREMENT,cod VARCHAR(255),paypalid VARCHAR(255),stripepkey VARCHAR(255),stripeskey VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("varivalues table creatd");
        res.send('varivalues table creatd');
    });
};



exports.coupon = async (req, res) => {
    let sql = 
       'CREATE TABLE coupon(id int AUTO_INCREMENT,code VARCHAR(255), value int,minimun int, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("varivalues table creatd");
        res.send('varivalues table creatd');
    });
};



exports.slider = async (req, res) => {
    let sql = 
       'CREATE TABLE slider(id int AUTO_INCREMENT,img VARCHAR(255), title VARCHAR(255), heading VARCHAR(255), buttontext VARCHAR(255),buttonlink VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("varivalues table creatd");
        res.send('varivalues table creatd');
    });
};






exports.footer = async (req, res) => {
    let sql = 
       'CREATE TABLE footer(id int AUTO_INCREMENT,address VARCHAR(255), email1 VARCHAR(255), email2 VARCHAR(255), phone1 VARCHAR(255),phone2 VARCHAR(255),fb VARCHAR(255),tw VARCHAR(255),ins VARCHAR(255),android VARCHAR(255), iphone VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("footer table creatd");
        res.send('footer table creatd');
    });
};


exports.terms = async (req, res) => {
    let sql = 
       'CREATE TABLE terms(id int AUTO_INCREMENT,term VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("terms table creatd");
        res.send('terms table creatd');
    });
};


exports.shiping = async (req, res) => {
    let sql = 
       'CREATE TABLE shiping(id int AUTO_INCREMENT,title VARCHAR(255),value int, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("terms table creatd");
        res.send('terms table creatd');
    });
};




exports.fav = async (req, res) => {
    let sql = 
       'CREATE TABLE fav(id int AUTO_INCREMENT,uid int,pid int, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("terms table creatd");
        res.send('terms table creatd');
    });
};












exports.chat = async (req, res) => {
    // flag1 int,flag2 int, unread int
    let sql = 
       'CREATE TABLE chat(id int AUTO_INCREMENT,senderid VARCHAR(255), receiverid VARCHAR(255), date VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("chat table creatd");
        res.send('chat table creatd');
    });
};

exports.chatwatch = async (req, res) => {
    let sql = 
       'CREATE TABLE chatwatch(id int AUTO_INCREMENT,chatid int, userid VARCHAR(255),flag int,unread int ,PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("chatwatch table creatd");
        res.send('chatwatch table creatd');
    });
};

exports.message = async (req, res) => {
    let sql = 
       'CREATE TABLE message(id int AUTO_INCREMENT, chatid int, senderid VARCHAR(255), message VARCHAR(255),date VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("message table creatd");
        res.send('message table creatd');
    });
};







