var express = require('express');
var app = express();

app.listen(8080, (req, res)=>{
    console.log("Server started...");
});


app.get('/mes',function(req,res){
    
    let message = '{ "senderName" : "Anmol", "message" : "'+req.query.message+'"}';

    var jsonObj = JSON.parse(message);
    
    res.send(jsonObj);
    
    console.log(jsonObj);
    
});


