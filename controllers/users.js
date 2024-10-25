 const User = require("../models/user")
module.exports.rendersignupForm = async(req, res) => {
    await res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {

        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registereduser = await User.register(newUser, password);
        console.log(registereduser);
        req.login(registereduser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "Welcome to Travel Nook");
            res.redirect("/listings")
        })

    } catch (error) {
        req.flash("error", error.message);
        console.log(error);
        res.redirect("/signup")
    }

}

module.exports.renderloginform = (req, res) => {
    res.render("users/login.ejs");
}
module.exports.loginpost = async (req, res) => {
    req.flash("Welcome to Travel NOOK your are looged in");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are Logged Out!")
        res.redirect("/listings");


    })
}