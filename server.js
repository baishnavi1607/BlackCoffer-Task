const express = require("express");
var mongo = require("mongodb").MongoClient;
const { MongoClient } = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
var cors = require("cors");
var jwt = require("jsonwebtoken");
var app = express();
var port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongo.connect("mongodb://localhost:27017/Mern_Stack",function(err, server){
    if(err) {
        console.log("connection error "+err);
    }else{
        app.post("/get_users", (req, res) => {
            if(req.body.hasOwnProperty("limit") &&
            req.body.hasOwnProperty("skip")){
            var users = [];
            var cursor = server.db().collection("Data").find({}).
            limit(parseInt(req.body.limit)).
            skip(parseInt(req.body.skip));
            
            cursor.forEach(function(doc, err2){
                if(!err2){
                    users.push(doc);
                }
            }, function(){
                if(users.length === 0) {
                    res.json({status : false, message: "No data in collection"});
                } else{
                    res.json({status: true, result: users });
                }
            })
        }   else{
            res.json({status : false, message: "some params are missing"});
        }
        })
    }
})

app.get("/",(req, res)=>{
res.send("welcome to express project");
})

app.get("/check", (req , res)=>{
console.log(req.query);
res.send("HI "+req.query.name);
})

app.listen(port, ()=>{
console.log("app is running on port "+port);
});