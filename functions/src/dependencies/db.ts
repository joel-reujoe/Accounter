var sql = require('mysql');

interface mysqlConnection{
    host:string,
    user:string,
    password:string,
    database:string,
};
//35.200.167.245
class dbconnect implements mysqlConnection{
     host;user;password;database;
     constructor() {
        this.host = 'ec2-54-163-229-212.compute-1.amazonaws.com';
        this.user = `phmjzfzuxzkwgo`;
        this.password = `c65a4d4a5744a10ebe59c98214279da9dcc6419f6303d7c749a9aa2a54902ddd`;
        this.database = `society_job`;
        //this.init();
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


const services={
    connectdb:async()=>{
        return new Promise(function (resolve, reject){
            var connection = sql.createConnection({
                    host: "35.193.249.1",
                    user: "istatsuser",
                    password: "istatstest123",
                    database: "atomvmnn_istats_db"
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
        });
        },
    connectdb_name:async(dbname)=>{
                        return new Promise(function (resolve, reject){
                            var connection = sql.createConnection({
                                    host: "localhost",
                                    user: "root",
                                    password: "",
                                    database: dbname
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
                        });
                        },
    disconnectdb:(connection)=>  {
                              connection.end(()=>{console.log("connection closed")})
                                }
    }
    module.exports=dbconnect;