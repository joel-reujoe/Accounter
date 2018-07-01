var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const moment = require('moment-timezone');
const moment1 = require('moment');
moment().tz('Asia/Kolkata');
const Master_functions1 = require('../dependencies/masterfunctions.js');
class model_account {
    constructor(connection) {
        this.model_functions = {
            test_model: (req, text, next) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        var data = { name: "joel", age: 21, text_message: text };
                        resolve(data);
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            }),
            addSociety: (req, society_name, address, no_of_residents, type, next) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        var SQL1 = `SELECT society_name FROM society_details WHERE society_name='${society_name}'`;
                        this.connection.query(SQL1, [society_name], (err, result) => __awaiter(this, void 0, void 0, function* () {
                            if (err)
                                throw next(err);
                            if (result.length > 0) {
                                var data = { status: "false", message: "Society already exists" };
                                resolve(data);
                            }
                            else {
                                var SQL = "INSERT INTO society_details(`society_name`,`address`,`no_of_residents`,`type`) VALUES('" + society_name + "','" + address + "','" + no_of_residents + "','" + type + "')";
                                this.connection.query(SQL, (err, result) => __awaiter(this, void 0, void 0, function* () {
                                    if (err)
                                        throw next(err);
                                    if (result.affectedRows > 0) {
                                        var data = { status: "true", message: "Society Registered" };
                                        resolve(data);
                                    }
                                    else {
                                        data = { status: "false", message: "Society Register Failed" };
                                        resolve(data);
                                    }
                                }));
                                this.connection.end();
                            }
                        }));
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            }),
            viewSociety: (req, next) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        var SQL = "SELECT society_name,address,no_of_residents FROM society_details";
                        this.connection.query(SQL, (err, result) => __awaiter(this, void 0, void 0, function* () {
                            if (err)
                                throw next(err);
                            if (result.length > 0) {
                                var data = { status: "true", message: result };
                                resolve(data);
                            }
                            else {
                                data = { status: "false", message: "No societies entered" };
                                resolve(data);
                            }
                            this.connection.end();
                        }));
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            }),
            getSociety: () => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        var data = {};
                        var sql = "SELECT society_name FROM society_details";
                        this.connection.query(sql, (err, result) => __awaiter(this, void 0, void 0, function* () {
                            if (err)
                                throw err;
                            if (result.length > 0) {
                                data = { status: "true", message: result };
                            }
                            else {
                                data = { status: "false" };
                            }
                            resolve(data);
                            this.connection.end();
                        }));
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            }),
            addResident: (req, name, flat_no, society_name, area, unit, next) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        var sql = "SELECT society_id FROM society_details WHERE society_name=?";
                        this.connection.query(sql, [society_name], (err, result) => __awaiter(this, void 0, void 0, function* () {
                            if (err)
                                throw err;
                            var sql1 = "SELECT resident_id FROM resident_details WHERE owner_name=?";
                            this.connection.query(sql1, [name], (err, result1) => __awaiter(this, void 0, void 0, function* () {
                                if (err)
                                    throw err;
                                if (result1.length > 0) {
                                    var data = { status: "false", message: "Resident already exist" };
                                    resolve(data);
                                }
                                else {
                                    var SQL = `INSERT INTO resident_details(owner_name,society_name,society_id,flat_no,area,unit) VALUES ('${name}','${society_name}',${result[0].society_id},'${flat_no}','${area}','${unit}')`;
                                    this.connection.query(SQL, (err, result1) => __awaiter(this, void 0, void 0, function* () {
                                        if (err)
                                            throw err;
                                        if (result1.insertId > 0) {
                                            data = { status: "true", message: "Resident Registered" };
                                        }
                                        else {
                                            data = { status: "false", message: "Could not register" };
                                        }
                                        resolve(data);
                                    }));
                                }
                            }));
                        }));
                        this.connection.end();
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            }),
            viewResident: (req, society_name, next) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        var SQL = "SELECT society_id FROM society_details WHERE society_name=?";
                        this.connection.query(SQL, [society_name], (err, result) => __awaiter(this, void 0, void 0, function* () {
                            if (err)
                                throw err;
                            console.log(result);
                            if (result.length > 0) {
                                console.log(result);
                                var sql = "SELECT owner_name, society_name, flat_no,area FROM resident_details WHERE society_id=?";
                                this.connection.query(sql, [result[0].society_id], (err, result1) => __awaiter(this, void 0, void 0, function* () {
                                    if (err)
                                        throw err;
                                    if (result1.length > 0) {
                                        var data = { status: "true", message: result1 };
                                        resolve(data);
                                    }
                                    else {
                                        data = { status: "false", message: "no result to display" };
                                        resolve(data);
                                    }
                                }));
                            }
                            else {
                                resolve({ status: false });
                            }
                        }));
                        this.connection.end();
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            }),
            getResident: (req, society_name, next) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        var SQL = "SELECT society_id FROM society_details WHERE society_name=?";
                        this.connection.query(SQL, [society_name], (err, result) => __awaiter(this, void 0, void 0, function* () {
                            if (err)
                                throw err;
                            if (result.length) {
                                var id = result[0].society_id;
                                var SQL1 = "SELECT owner_name FROM resident_details WHERE society_id=?";
                                this.connection.query(SQL1, [id], (err, result1) => __awaiter(this, void 0, void 0, function* () {
                                    if (err)
                                        throw err;
                                    if (result1.length > 0) {
                                        var data = { status: "true", message: result1 };
                                        resolve(data);
                                    }
                                }));
                            }
                            else {
                                resolve({ status: "false", message: "no result" });
                            }
                        }));
                        this.connection.end();
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            }),
            createBill: (req, resident, service, water, sink, repair, other, from, to, due, next) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        var from1 = moment(from).format('DD-MM-YYYY');
                        var to1 = moment(to).format('DD-MM-YYYY');
                        var due1 = moment(due).format('DD-MM-YYYY');
                        console.log(from1, to1, due1);
                        var amount = Number(service) + Number(water) + Number(sink) + Number(repair) + Number(other);
                        if (other == "") {
                            var SQL = `INSERT INTO bill_details(service_charge,water_charge,sinking_fund,repair_fund,other_expense,from1,to1,due,account) VALUES(${service},${water},${sink},${repair},0,'${from1}','${to1}','${due1}',${amount})`;
                        }
                        else {
                            var SQL = `INSERT INTO bill_details(service_charge,water_charge,sinking_fund,repair_fund,other_expense,from1,to1,due,account) VALUES(${service},${water},${sink},${repair},${other},'${from1}','${to1}','${due1}',${amount})`;
                        }
                        var result = yield Master_functions1.sqlProcess(SQL, this.connection, next);
                        if (result.affectedRows > 0) {
                            var bill_id = result.insertId;
                            var SQL2 = `SELECT resident_id FROM resident_details WHERE owner_name='${resident}'`;
                            var result2 = yield Master_functions1.sqlProcess(SQL2, this.connection, next);
                            console.log(result2);
                            if (result2.length > 0) {
                                var SQL3 = `SELECT SUM(amount) AS amount_pending FROM bill_resident_mapping WHERE resident_id=${result2[0].resident_id} AND status='pending'`;
                                var result3 = yield Master_functions1.sqlProcess(SQL3, this.connection, next);
                                if (result3[0].amount_pending == null) {
                                    var amount = Number(service) + Number(water) + Number(sink) + Number(repair) + Number(other);
                                    console.log("hi");
                                    console.log(amount);
                                    var SQL4 = `INSERT INTO bill_resident_mapping(bill_id,resident_id,status,amount)VALUES (${bill_id},${result2[0].resident_id},'pending',${amount})`;
                                    var result4 = yield Master_functions1.sqlProcess(SQL4, this.connection, next);
                                    if (result4.affectedRows > 0) {
                                        resolve({ status: true });
                                    }
                                    else {
                                        resolve({ status: false });
                                    }
                                }
                                else {
                                    var amount = Number(service) + Number(water) + Number(sink) + Number(repair) + Number(other) + Number(result3[0].amount_pending);
                                    var SQL5 = `INSERT INTO bill_resident_mapping(bill_id,resident_id,status,amount)VALUES(${bill_id},${result2[0].resident_id},'pending',${amount})`;
                                    var result4 = yield Master_functions1.sqlProcess(SQL5, this.connection, next);
                                    if (result4.affectedRows > 0) {
                                        resolve({ status: true });
                                    }
                                    else {
                                        resolve({ status: false });
                                    }
                                }
                            }
                        }
                        this.connection.end();
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            }),
            viewBill: (req, resident_name, next) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        console.log(resident_name);
                        var SQL = `SELECT resident_id,society_id FROM resident_details WHERE owner_name='${resident_name}'`;
                        var result = yield Master_functions1.sqlProcess(SQL, this.connection, next);
                        if (result.length > 0) {
                            var SQL1 = `SELECT society_name,Address,type FROM society_details WHERE society_id=${result[0].society_id}`;
                            var SQL2 = `SELECT MAX(amount) as outstanding FROM bill_resident_mapping WHERE resident_id=${result[0].resident_id} AND status='pending' AND amount<(SELECT MAX(amount) FROM bill_resident_mapping)`;
                            var result1 = yield Master_functions1.sqlProcess(SQL1, this.connection, next);
                            var result2 = yield Master_functions1.sqlProcess(SQL2, this.connection, next);
                            var SQL3 = `SELECT bill_id, count(bill_id) as count FROM bill_resident_mapping WHERE resident_id=${result[0].resident_id}`;
                            var result3 = yield Master_functions1.sqlProcess(SQL3, this.connection, next);
                            var SQL4 = `SELECT bill_id,service_charge,water_charge,sinking_fund,repair_fund,other_expense,from1,to1,due,account FROM bill_details WHERE bill_id=${result3[0].bill_id}`;
                            var result4 = yield Master_functions1.sqlProcess(SQL4, this.connection, next);
                            var SQL5 = `SELECT flat_no, area,owner_name,unit FROM resident_details WHERE owner_name='${resident_name}'`;
                            var result5 = yield Master_functions1.sqlProcess(SQL5, this.connection, next);
                            if (result2[0].outstanding == null) {
                                result2[0].outstanding = 0;
                            }
                            var processData = { result1: result1, result2: result2, result4: result4, result5: result5, result3: result3 };
                            var sendmsg = Master_functions1.formatSentResponse(processData, "true", "");
                            resolve(sendmsg);
                        }
                        this.connection.end();
                    }
                    catch (e) {
                        next(e);
                    }
                }));
            }),
            viewAll: (req, society_name, next) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        var data1 = [];
                        var sql = `SELECT society_id FROM society_details WHERE society_name='${society_name}'`;
                        var result = yield Master_functions1.sqlProcess(sql, this.connection, next);
                        if (result.length > 0) {
                            var sql1 = `SELECT count(*) as count FROM resident_details WHERE society_id=${result[0].society_id}`;
                            var result1 = yield Master_functions1.sqlProcess(sql1, this.connection, next);
                            var sql2 = `SELECT owner_name FROM resident_details WHERE society_id=${result[0].society_id}`;
                            var result2 = yield Master_functions1.sqlProcess(sql2, this.connection, next);
                            console.log(result2);
                            if (result1[0].count > 0) {
                                for (var i = 0; i < result1[0].count; i++) {
                                    var data = yield this.model_functions.viewBill(req, result2[i].owner_name, next);
                                    data1.push(data);
                                }
                                console.log(data1);
                                resolve(data1);
                            }
                        }
                    }
                    catch (e) {
                        next(e);
                    }
                }));
            })
        };
        this.connection = connection;
        this.hrtime = process.hrtime;
        this.datetimestamp = moment();
    }
}
module.exports = model_account;
//# sourceMappingURL=model-account.js.map