var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var url = require('url');
var path = require('path');
var express = require('express');
var sql = require('mysql');
var bodyParser = require('body-parser');
const Master_Functions1 = require('./functions/lib/dependencies/masterfunctions.js');
var dbservice = require('./functions/lib/dependencies/db.js');
var router_account = require('./functions/lib/routers/router_account.js');
var app = express();
app.use(bodyParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var service = yield new dbservice();
        req.connection = yield service.connectdb();
        next();
    });
});
app.use('/urlparser', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var service1 = yield new dbservice();
    let connection1 = yield service1.connectdb();
    var sql = "select gen_mca_user_details_id,photo from gen_mca_user_details";
    connection1.query(sql, function (err, result) {
        console.log(sql);
        if (err)
            throw next(err);
        else {
            let send = {
                data: (result),
                status: "true"
            };
            for (const key in result) {
                //console.log(key+"  "+result[key].gen_mca_user_details_id)
                // console.log(result[key].photo);
                let photo = result[key].photo;
                let gen_mca_user_details_id = result[key].gen_mca_user_details_id;
                let parsedurl = url.parse(photo);
                let imagename = (path.basename(parsedurl.pathname));
                let mainurl = `https://istatsbackend.com/images/mcaimages/${imagename}`;
                if (imagename != "noimage.gif") {
                    console.log("image update" + gen_mca_user_details_id);
                    var sql1 = `UPDATE gen_mca_user_details SET photo = "${mainurl}"
                WHERE gen_mca_user_details_id=${gen_mca_user_details_id}`;
                    connection1.query(sql1, function (err, result) {
                        if (err)
                            throw err;
                        // services.disconnectdb(connection);
                        //resolve(data);
                    });
                }
                else {
                    //console.log("noimage");
                }
            }
        }
    });
}));
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('hi');
});
app.use('/controller/ctrl-account', router_account);
app.listen(8000, () => {
    console.log("Server Started at 8000");
});
//# sourceMappingURL=controller.js.map