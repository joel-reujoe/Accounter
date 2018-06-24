const moment = require('moment-timezone');
const moment1 = require('moment');
moment().tz('Asia/Kolkata');
var ctrl_account=require('../controllers/ctrl-account.js');
class switch_router
{
    public hrtime;mydatetimestamp;
    constructor()
    {
        this.hrtime=process.hrtime;
        this.mydatetimestamp=moment();
    }
    public switch_account=async(req,res,next)=>{
        var action=req.body.action;
        var ctrl_account_object=new ctrl_account(req.connection);
        // console.log(req.body);
        switch(action)
        {
            case "addSociety":
                var data=await ctrl_account_object.ctrl_functions.addSociety(req,next);
                res.send(data);
                break
            case "viewSociety":
            var data=await ctrl_account_object.ctrl_functions.viewSociety(req,next);
            res.send(data);
                break;
            case "getSociety":
                var data=await ctrl_account_object.ctrl_functions.getSociety(req,next);
                res.send(data);
                break;
            case "addResident":
                var data=await ctrl_account_object.ctrl_functions.addResident(req,next);
                res.send(data);                
                break
            case "viewResident":
                var data=await ctrl_account_object.ctrl_functions.viewResident(req,next);
                res.send(data);                                
                break;
            case "getResident":
                var data=await ctrl_account_object.ctrl_functions.getResident(req,next);
                res.send(data);
                break;
            case "createBill":
                var data=await ctrl_account_object.ctrl_functions.createBill(req,next);
                res.send(data);
                break;
            case "viewBill":
                console.log("hi")
                var data=await ctrl_account_object.ctrl_functions.viewBill(req,next);
                res.send(data);
                break;
            case "viewAll":
                var data=await ctrl_account_object.ctrl_functions.viewAll(req,next)
                res.send(data);
                break;
            default:
                res.send({status:"false"});
        }
    }
}
module.exports=switch_router;