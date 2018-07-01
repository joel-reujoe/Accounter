const moment = require('moment-timezone');
const moment1 = require('moment');
moment().tz('Asia/Kolkata');
var model_account=require('../models/model-account.js');
class ctrl_account{

    public hrtime;datetimestamp;connection;
    constructor()
    {

        this.datetimestamp=moment();
        this.hrtime=process.hrtime;
    }
    public ctrl_functions={
        test:async(req,next)=>
        {
            var text=req.query.text;
            var model_account_object=new model_account();
            var data=await model_account_object.model_functions.test_model(req,text,next);
            return data;
        },
        addSociety:async(req,next)=>{
            console.log(req.body);
            var society_name=req.body.society_name;
            var address=req.body.address;
            var no_of_residents=req.body.nor;
            var type=req.body.type;
            if(society_name=="" || address=="" || no_of_residents=="")
            {
                var data={status:"fail"}
                return data;
            }
            else{
                var model_account_object=new model_account(req.connection);   
                console.log(society_name,address,no_of_residents);         
                var data=await model_account_object.model_functions.addSociety(req,society_name,address,no_of_residents,type,next);
                return data;
            }
           
        },
        viewSociety:async(req,next)=>{
            var model_account_object=new model_account(req.connection);
            var data=await model_account_object.model_functions.viewSociety();
            return data;
        },
        getSociety:async(req,next)=>{
            var model_account_object=new model_account(req.connection);
            var data=await model_account_object.model_functions.getSociety();
            return data;
        },
        addResident:async(req,next)=>{
            var model_account_object=new model_account(req.connection);            
            var name=req.body.name;
            var flat_no=req.body.flat_no;
            var society_name=req.body.option;
            var area=req.body.area;
            var unit=req.body.unit;            
            if(name=="" || flat_no=="" || society_name=="Select" || area=="")
            {
                var data={status:"fail",message:"Please enter this field"}
                return data;
            }
            else{
                var data=await model_account_object.model_functions.addResident(req,name,flat_no,society_name,area,unit,next);
                return data;
            }
        },
        viewResident:async(req,next)=>
        {
            var model_account_object=new model_account(req.connection);                        
            var society_name=req.body.name;
            if(society_name=="Select a Building")
            {
                var data={status:false};
                return data;
            }
            else{
                var data=await model_account_object.model_functions.viewResident(req,society_name,next);
                return data;
            } 
        },
        getResident:async(req,next)=>{
            var society_name=req.body.society_name;
            var model_account_object=new model_account(req.connection);                                    
            var data=await model_account_object.model_functions.getResident(req,society_name,next);
            return data;
        },
        createBill:async(req,next)=>{
            var model_account_object=new model_account(req.connection);                                                
            var resident=req.body.resident;
            var service=req.body.service;
            var water=req.body.water;
            var sink=req.body.sink;
            var repair=req.body.repair;
            var other=req.body.other;
            var from=req.body.from;
            var to=req.body.to;
            console.log(to)
            var due=req.body.due;
            if(service=="" || water=="" || service=="" || repair=="" || due=="" || from=="" || to=="")
            {
                var data={status:"false"}
                return data;
            }
            else{
                var data=await model_account_object.model_functions.createBill(req,resident,service,water,sink,repair,other,from,to,due,next)
                return data;
            }
        },
        viewBill:async(req,next)=>{
            var model_account_object=new model_account(req.connection);                                                
            var resident_name=req.body.resident;
            var data=await model_account_object.model_functions.viewBill(req,resident_name,next);
            return data;

        },
        viewAll:async(req,next)=>{
            var model_account_object=new model_account(req.connection);
            var society_name=req.body.society;
            if(society_name=="--Select--")
            {
                var data={status:"false"}
                return data;
            }
            else{
                data=await model_account_object.model_functions.viewAll(req,society_name,next);
                return data;
            }
        }
    }
}
module.exports=ctrl_account;