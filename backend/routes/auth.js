const express = require("express");
const User = require("../modules/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();


// bcrypt is used for password hashing
const bcrypt = require('bcryptjs');


// jwt will authorise the user to prevent attacks and info loss used to authorise the user making requests to the server
// it creates a token and encodes the payload and the secret key using an encoding algo like HS256
var jwt = require('jsonwebtoken');
const JWT_Secret = "sshhhhh";


// fetching fetch user which is a function that finds the id of the user by authenticating it with the jwt token
const fetchuser=require("../middleware/fetchuser")


// Route 1: Create a user using post  "/api/auth/createuser" no login req
router.post('/createuser', [
    body('name', 'name must contain atleast 3 characters').isLength({ min: 3 }),
    body('password', 'password must contain atleast 8 characters').isLength({ min: 8 }),
    body('email', 'Enter a valid email id').isEmail()

], async (req, res) => {
    let success = false;
    // if there are errors then return bad requests and also the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });

    }
    // check if the user with that email already exists
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user !== null) {
            return res.status(400).json({success, error: "This email is already registered here" })
        }
        const salt = await bcrypt.genSalt(10);
        const setPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: setPass,
            email: req.body.email
        })
        console.log("User registered successfully ...")
        console.log(user)
        const data = {
            user: { id: user.id }
        }
        const authToken = jwt.sign(data, JWT_Secret);
        success=true;
        res.json({success, authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
}
)
// Route 2: Logging a  user in with post req /api/auth.login login in req
router.post('/login', [
    body('password', 'password must contain atleast 8 characters').isLength({ min: 8 }),
    body('email', 'Enter a valid email id').isEmail()],
    async (req, res) => {
        let success =false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });

        }
        try {
            let user = await User.findOne({email: req.body.email})
            if (user !== null) {
                const passwordCompare = await bcrypt.compare(req.body.password, user.password)
                if (!passwordCompare)
                {
                    res.status(400).json({success, error: "email / password is incorrect" })
                }
                else{
                    const data = {
                        user: { id: user.id }
                    }
                    const authToken = jwt.sign(data, JWT_Secret);
                    success=true;
                    res.json({success, authToken })
                }
            }
            else {
                res.status(400).json({ success,error: "email / password is incorrect" })
            }

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured")
        
        }
    })

    // Route 3: finding the details of the user using the jwt token 
    router.post('/getuser',fetchuser,
    async (req,res)=>{
        try {

            let user= await User.findById(req.user.id).select("-password");
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured")
        
        }
    })
module.exports = router