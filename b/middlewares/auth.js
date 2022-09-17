const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { sendError } = require("../utils/helper");

exports.isAuth = async (req, res, next) => {
 
  const bearerToken = req.headers.access_token

  if (!bearerToken) return sendError(res, "unauthorized access!");

  const token = bearerToken.split(" ")[1];
  if (!token) return sendError(res, "unauthorized access!");

  var decode = {};

  try {
    decode = jwt.verify(token, process.env.JWT_SECRET)
  }
  catch(err) {
    return sendError(res, "authorized Failed");
  }

  if (!decode.userId) {
    return sendError(res, "unauthorized access!");
  }

  let sql = `SELECT * FROM users WHERE id = ? `;
  let query = await db.query(sql,[decode.userId],(err, result) => {
    if(err) throw err;
     if(result.length !== 0){
      req.user = result[0];
      next();
    }else{
      return sendError(res, "unauthorized access!");
    }
 });

};

exports.isAdmin = async (req, res, next) => {
  const { user } = req;
  if (user.role === "admin" || user.role === "seller") next();
  else return sendError(res, "unauthorized access!");
};
