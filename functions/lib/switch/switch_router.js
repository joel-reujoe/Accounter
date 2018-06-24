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
var ctrl_account = require('../controllers/ctrl-account.js');
class switch_router {
    constructor() {
        this.switch_account = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var action = req.body.action;
            var ctrl_account_object = new ctrl_account(req.connection);
            // console.log(req.body);
            switch (action) {
                case "addSociety":
                    var data = yield ctrl_account_object.ctrl_functions.addSociety(req, next);
                    res.send(data);
                    break;
                case "viewSociety":
                    var data = yield ctrl_account_object.ctrl_functions.viewSociety(req, next);
                    res.send(data);
                    break;
                case "getSociety":
                    var data = yield ctrl_account_object.ctrl_functions.getSociety(req, next);
                    res.send(data);
                    break;
                case "addResident":
                    var data = yield ctrl_account_object.ctrl_functions.addResident(req, next);
                    res.send(data);
                    break;
                case "viewResident":
                    var data = yield ctrl_account_object.ctrl_functions.viewResident(req, next);
                    res.send(data);
                    break;
                case "getResident":
                    var data = yield ctrl_account_object.ctrl_functions.getResident(req, next);
                    res.send(data);
                    break;
                case "createBill":
                    var data = yield ctrl_account_object.ctrl_functions.createBill(req, next);
                    res.send(data);
                    break;
                case "viewBill":
                    console.log("hi");
                    var data = yield ctrl_account_object.ctrl_functions.viewBill(req, next);
                    res.send(data);
                    break;
                case "viewAll":
                    var data = yield ctrl_account_object.ctrl_functions.viewAll(req, next);
                    res.send(data);
                    break;
                default:
                    res.send({ status: "false" });
            }
        });
        this.hrtime = process.hrtime;
        this.mydatetimestamp = moment();
    }
}
module.exports = switch_router;
//# sourceMappingURL=switch_router.js.map