const mysql = require('mysql2/promise');

const connection =  mysql.createConnection({host:'localhost', user: 'root', database: 'monpur'});

module.exports = connection;