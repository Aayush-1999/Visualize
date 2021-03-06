const express      = require("express"),
      router       = express.Router(),
      bcrypt       = require("bcryptjs"),
      jwt          = require("jsonwebtoken"),
      User         = require("../models/user");

//REGISTER ROUTE
router.post("/register",async(req,res)=>{
    try{   
        let user = await User.findOne({email:req.body.email})
        if(user) return res.status(200).json({msg:"User already exists"})
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        const userToken=jwt.sign(
            {tokenId:process.env.TOKEN_ID},
            process.env.JWT_SECRET_KEY,
        )
        user = await User.create({
            firstName:req.body.firstname,
            lastName:req.body.lastname,
            email:req.body.email,
            password:hash,
            token:userToken,
            image:"https://res.cloudinary.com/image-storage/image/upload/v1572009434/blank-avatar_opbhgx.png"
        });
        res.status(200).json({token: userToken});
    }
    catch(err){
        console.log(err)
        res.status(400).json({msg:"registration unsuccessful"});
    }
})

//LOGIN ROUTE - CHECK EMAIL 
router.post("/login/checkEmail",async(req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email})
        if(user!=null) res.status(200).json({msg:"user email found"})
        else res.status(404).json({msg:"email not found"});
    }
    catch(err){
        res.status(204).send(err);
    }
})

//LOGIN ROUTE- VERIFY PASSWORD
router.post("/login/checkPwd",async(req, res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        bcrypt.compare(req.body.password,user.password)
            .then(isMatch=>{
                if(!isMatch) return res.status(400).json({msg:"Invalid Password"})
                res.status(200).json({token: user.token});
            })
    }
    catch(err){
        res.status(400).json({msg:"Something went wrong"})
    }
})

module.exports=router;