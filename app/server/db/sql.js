var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '111111',
  database : 'aolai'
});

module.exports = connection;