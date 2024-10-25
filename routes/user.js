const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const  passport  = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControler = require("../controllers/users.js")

router.route("/signup")
.get(userControler.rendersignupForm)
.post( wrapAsync(userControler.signup));


router.route("/login")
.get(userControler.renderloginform)

.post
(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true}),
     userControler.loginpost);


     
router.get("/logout",userControler.logout)
module.exports= router; 