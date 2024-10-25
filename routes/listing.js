const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const{isLoggedIn , isOwner , validateListing} = require("../middleware.js");
const { populate } = require("../models/review.js");
const listingcontroller = require("../controllers/listings.js")
const multer  = require('multer')

const {storage}= require("../cloudConfig.js");

const upload = multer({ storage})





router
.route("/")
.get(wrapAsync(listingcontroller.index) )
// 
.post(isLoggedIn,upload.single("avatar"),validateListing,
wrapAsync(listingcontroller.createListing))

//New Route

router.get("/new",isLoggedIn,listingcontroller.renderNewForm )

router.route("/:id")
.get( wrapAsync(listingcontroller.showListing))
.put(isLoggedIn,isOwner, upload.single("avatar"),validateListing, listingcontroller.renderUpdateForm)
.delete(isLoggedIn,isOwner,listingcontroller.destroyListing);





//Edit route
router.get("/:id/edit", isLoggedIn,isOwner,listingcontroller.renderEditForm);


module.exports = router;
