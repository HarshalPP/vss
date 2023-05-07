const Adminlogin = require("../models/admin");
const session = require('express-session')
const jwt = require('jsonwebtoken');
var md5 = require('md5');
const { count } = require("../models/admin");
const secretkey = process.env.SECRETKEY;
exports.auth = async (req, res) => {
    try {
        const newUser = await Adminlogin.findOne({ username: req.body.username, password:md5(req.body.password) });
        //  res.status(200).json(newUser);
        if (newUser != '' && newUser != null) {
            const updatedUser = await Adminlogin.findById(newUser['_id']).exec();
            updatedUser.set({"status":true});
            const updateSalesorder = await updatedUser.save();
            // res.status(200).json({ "message": "sucess" });
            jwt.sign({ newUser },secretkey, { expiresIn: '24h' }, (err, token) => {
            
                res.status(200).json({ "status": /*"1"*/"true", "data": { "_id": newUser['_id'], "username": newUser['username'], token } });
            });
        }
        else {
            res.status(200).json({ "message": "no record found" });

        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
exports.changeStatus = async(req,res)=>{
    const updatedUser = await Adminlogin.findOne()
    //updatedUser.set({"status":0});
    updatedUser.set({"status":false});
    const updateSalesorder = await updatedUser.save();
    res.status(200).json({"msg":"status change"});
}
exports.checkStatus = async(req,res)=>{
    const adminStatus =await Adminlogin.findOne();
    res.status(200).json({"message":"admin status","loginStatus":adminStatus['status']});
}

exports.manualchanges = async(req,res)=>{
    const updatedUser = await Adminlogin.findOne().exec();
    updatedUser.set(req.body);
    const updateSalesorder = await updatedUser.save();

    setInterval(()=>{
      
    
            updatedUser.set({"status":"false"}); //"0"
            updatedUser.save();
        
    },43200000);


    res.status(200).json({"msg":"status change"});

}

