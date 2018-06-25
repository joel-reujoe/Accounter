var url = require('url');
var path = require('path');
var express = require('express');
var sql = require('mysql');
var bodyParser = require('body-parser');
const Master_Functions1=require('./dependencies/masterfunctions.js');
var dbservice=require('./dependencies/db.js');
var router_account=require('./routers/router_account.js');

var app=express();
app.use(bodyParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(async function(req, res, next) {
    var service = await new dbservice();
    req.connection =await service.connectdb();
    next();
});

app.post('/',(req,res)=>{
    dbservice.connect();
    res.send('hi')
})
app.use('/controller/ctrl-account',router_account);
app.listen(8000,()=>{
    console.log("Server Started at 8000");
})