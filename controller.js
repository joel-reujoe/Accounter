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
var router_account = require('./functions/lib/routers/router_account.js');
var app = express();
app.use(bodyParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(function (req, res, next) {
//     return __awaiter(this, void 0, void 0, function* () {`
//         var service = yield new dbservice();
//         req.connection = yield service.connectdb();
//         next();
//     });
// });

app.get('/front-end-js/general.js',async(req,res)=>{
    res.setHeader('content-type','text/javascript')
    res.sendFile(__dirname+'/pages/front-end-js/general.js');
})
var path=require('path');
app.get('/addResident', (req, res) => {
    console.log("hi")
    res.setHeader('content-type','text/html');
    res.sendFile(path.join(__dirname+'/pages/html/addResident.html'));
});
app.get('/main.html', (req, res) => {
    console.log(req.query);
    res.sendFile(path.join(__dirname+'/pages/html/main.html'));
});
var port=process.env.PORT || 8000
app.use('/controller/ctrl-account', router_account);
app.listen(port, () => {
    console.log("Server Started at "+port);
});
//# sourceMappingURL=controller.js.map