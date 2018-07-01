"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Master_Functions {
    static fullUrl(req) {
        var url = {
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl,
            fullUrl: req.protocol + '://' + req.get('host') + req.originalUrl
        };
        return url;
    }
}
Master_Functions.arrayToObject = (array) => array.reduce((obj, item) => {
    return item;
}, {}); //watch out the empty{}, which is passed as "result".
Master_Functions.arrayToObjectmultiple = (array) => array.reduce((result, item, index, array) => {
    result[index] = item;
    return result;
}, {}); //watch out the empty{}, which is passed as "result".
Master_Functions.formatSentResponse = (processdata, statustosend, message) => {
    let send = {
        data: (processdata),
        status: statustosend,
        message: message
    };
    return send;
};
//Higher order error functions
Master_Functions.displayerror = (error, req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.status(error.status || 500);
    console.error("in under display error Master Function");
    console.error(error);
    res.send(error);
});
Master_Functions.logerrortoFbase = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var fullurl = Master_Functions.fullUrl(req);
    }));
});
Master_Functions.logacesstoFbase = (req, res, next, hrstart) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var hrend = process.hrtime(hrstart);
        var fullurl = Master_Functions.fullUrl(req);
    }));
});
Master_Functions.catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);
Master_Functions.sqlProcess = (sql, connection, next) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            connection.query(sql, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    next(err);
                resolve(result);
            }));
        }
        catch (e) {
            next(e);
        }
    }));
});
Master_Functions.conditionalQuery = (req, sql, arr, arrval, cond, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let i;
            for (i = 0; i < arr.length; i++) {
                if (i == (arr.length - 1)) {
                    sql += arr[i] + "='" + arrval[i] + "'";
                }
                else {
                    sql += arr[i] + "='" + arrval[i] + "' " + cond + " ";
                }
            }
            resolve(sql);
        }));
    }
    catch (err) {
        next(err);
    }
});
module.exports = Master_Functions;
//# sourceMappingURL=masterfunctions.js.map