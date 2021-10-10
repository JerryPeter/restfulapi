require('dotenv').config();

const jwt = require('jsonwebtoken');

const bcryptjs = require("bcryptjs");

const validator = require("fastest-validator");

const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET;

const SALT = process.env.SALT;

// ======================================== CREATE =======================
function create(req, res, next) {
    User.findOne({where:{email:req.body.email}}).then(result => {
        if (result) {
            res.status(409).json({
                message: "Alamat Email sudah digunakan ...",
            });            
        } else {
            // Jika Email belum digunakan akan masuk ke block ini            

            if (req.body.password === "") {
                res.status(409).json({
                    message: "Password tidak boleh kosong ...",
                });                   
            } else {
                // CREATE SALT PASSWORD

                bcryptjs.genSalt(10, function(err, salt) {

                    // HASH PASSWORD DENGAN SALT HASIL GENERATED
                    bcryptjs.hash(req.body.password, salt, function(err, hash){
                        
                        const data = {
                            username : req.body.username,
                            email : req.body.email,
                            password : hash,
                            fullname : req.body.fullname,
                            bio : req.body.bio,
                            picture : req.body.picture,        
                            createdBy: req.body.createdBy,
                            updatedBy: req.body.updatedBy,
                            isDeleted:req.body.isDeleted
                        }

                        // Validasi data sebelum di save
                        const schema = {
                            username : {type:"string", min: 3, max: 100, optional: false },
                            email : {type: "email", optional: false },
                            password : {type: "string", optional: false }                      
                        }    

                        const v = new validator();
                        const validateResult = v.validate(data, schema);

                        if (validateResult !== true) {
                            res.status(400).json({
                                message: "Data yang akan disimpan tidak valid ...",
                                error : validateResult
                            });
                        } else {
                            User.create(data).then((result)=>{
                                res.status(201).json({
                                    message: `Register user sukses ...${hash}`,
                                });
                            }).catch((err)=> {
                                res.status(500).json({
                                    message: "Something went wrong ...",
                                });
                            });  

                        }
                    });
                });
            }
        }
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}

// ======================================== READ DATA (BASE ON TOKEN) =======================
function read(req, res, next) {
    console.log(req.user);
    const id = req.user.userid;
    User.findByPk(id).then((users)=>{
        res.send(users);   
    }).catch((err)=>{
        res.send(err);
    });
}

// ======================================== UPDATE DATA (BASE ON TOKEN) =======================
function update(req, res, next) {
    const id = req.user.userid;
    console.log(`Data : ${req.body}`);

    // CREATE SALT PASSWORD

    bcryptjs.genSalt(10, function(err, salt) {

        // HASH PASSWORD DENGAN SALT HASIL GENERATED
        bcryptjs.hash(req.body.password, salt, function(err, hash){
            
            const data = {
                username : req.body.username,
                email : req.body.email,
                password : hash,
                fullname : req.body.fullname,
                bio : req.body.bio,
                picture : req.body.picture,        
                createdBy: req.body.createdBy,
                updatedBy: req.body.updatedBy,
                isDeleted:req.body.isDeleted
            }

            // Validasi data sebelum di save
            const schema = {
                username : {type:"string", min: 3, max: 100, optional: false },
                email : {type: "email", optional: false },
                password : {type: "string", optional: false }                      
            }    

            const v = new validator();
            const validateResult = v.validate(data, schema);

            if (validateResult !== true) {
                res.status(400).json({
                    message: "Data yang akan disimpan tidak valid ...",
                    error : validateResult
                });
            } else {

                User.update(data, {where: {id:id}}).then((result)=>{
                    res.send("Update Success");
                }).catch((err)=> {
                    res.send(err);
                });               
            }
        });
    });        
}

// // ======================================== SOFT DELETE (BASE ON TOKEN) =======================
function destroy(req, res, next) {
    console.log(req.user)
    const id = req.user.userid;
    console.log(`Data : ${req.body}`);
    const data ={       
        deletedBy: req.body.deleteddBy,
        isDeleted:req.body.isDeleted     
    }    
    User.update(data, {where: {id:id}}).then((result)=>{
        res.status(201).json({
            message: "DELETE succesfully"
        });
    }).catch((err)=> {
        res.status(500).json({
            message: "Something went wrong",
            error: error 
        });  
    });        
}

// ======================================== DELETE DATA FISIK (BASE ON TOKEN) =======================
// function destroy(req, res, next) {

//    const id = req.user.userid;
//     User.destroy({where: {id:id}}).then((result)=>{
//         res.status(201).json({
//             message: "DELETE succesfully",
//             post: result 
//         });
//     }).catch((err)=> {
//         res.status(500).json({
//             message: "Something went wrong",
//             error: error 
//         });     
//     });         
// }



// ======================================== SIGN IN / LOGIN =======================
function signin(req, res) {
    User.findOne({where:{email : req.body.email}}).then(user => {
        if (user === null) {
            res.status(401).json({
                message: "User Not Found  ....",
            });
        } else {
            console.log(`BODY ${req.body.password}, ${user.password}`);

            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if (result){
                    // Password cocok, selanjutnya generate token
                    console.log(JWT_SECRET);
                    const token = jwt.sign({
                        email : user.email,
                        userid : user.id
                    }, JWT_SECRET, function(err, token){
                        res.status(200).json({
                            message: "Authentication Sukses !!",
                            token : token
                        });                        
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid Credintial, wrong username or password ..",
                    });                    
                }
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong ...",
        });
    });
}



module.exports= {
    create,
    read,    
    update,
    destroy,
    signin
}