var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var sql = require('mysql');
;
//35.200.167.245
class dbconnect {
    constructor() {
        this.host = 'localhost';
        this.user = `root`;
        this.password = ``;
        this.database = `society_job`;
        //this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                return this.connectdb();
            });
        });
    }
    connectdb() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var connection = sql.createConnection({
                    host: this.host,
                    user: this.user,
                    password: this.password,
                    database: this.database
                });
                connection.connect((err) => {
                    if (err) {
                        reject(err);
                        console.error('error connecting: ' + err.stack);
                    }
                    else {
                        resolve(connection);
                        console.log('connected as id ' + connection.threadId);
                    }
                });
            });
        });
    }
    disconnectdb(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                connection.end(() => { console.log("connection closed"); resolve(true); });
            });
        });
    }
}
const services = {
    connectdb: () => __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            var connection = sql.createConnection({
                host: "35.193.249.1",
                user: "istatsuser",
                password: "istatstest123",
                database: "atomvmnn_istats_db"
            });
            connection.connect((err) => {
                if (err) {
                    reject(err);
                    console.error('error connecting: ' + err.stack);
                }
                else {
                    resolve(connection);
                    console.log('connected as id ' + connection.threadId);
                }
            });
        });
    }),
    connectdb_name: (dbname) => __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            var connection = sql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: dbname
            });
            connection.connect((err) => {
                if (err) {
                    reject(err);
                    console.error('error connecting: ' + err.stack);
                }
                else {
                    resolve(connection);
                    console.log('connected as id ' + connection.threadId);
                }
            });
        });
    }),
    disconnectdb: (connection) => {
        connection.end(() => { console.log("connection closed"); });
    }
};
module.exports = dbconnect;
//# sourceMappingURL=db.js.map