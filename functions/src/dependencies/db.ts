var sql = require('mysql');

interface mysqlConnection{
    host:string,
    user:string,
    password:string,
    database:string,
};
class dbconnect implements mysqlConnection{
     host;user;password;database;
     constructor() {
        this.host = 'localhost';
        this.user = `postgres`;
        this.password = `password`;
        this.database = `admin`;
        // this.init();
      }
      private async init() {
        return new Promise((resolve, reject) => {
            return this.connectdb();
            })
       }
      public async connectdb() {
        return new Promise((resolve, reject) => {
                var connection = sql.createConnection({
                    host: this.host,
                    user: this.user,
                    password: this.password,
                    database: this.database
                });
    
                connection.connect((err)=> {
                    if(err) {
                        reject(err);
                        console.error('error connecting: ' + err.stack);
                        }
                    else{
                        resolve(connection);
                        console.log('connected as id ' + connection.threadId);
                        }
                });
            })
       }
       public async disconnectdb(connection) {
        return new Promise((resolve, reject) => {
                connection.end(()=>{console.log("connection closed");resolve(true)});
            })
       }
}



    module.exports=dbconnect;