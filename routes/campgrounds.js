var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// CAMPGROUND INDEX ROUTE - show all the campgrounds
router.get("/", function(req, res){
    //get all of the campgrounds from database
    Campground.find({}, function(error, allCampgrounds){
       if(error){
           req.flash("error", "Could not load campgrounds");
           console.log(error);
       } else {
            //render the file
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
});

// CAMPGROUND NEW ROUTE - form to create a new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// CAMPGROUND CREATE route - add a new campground to the DB
router.post("/", middleware.isLoggedIn, function(req, res){
    
    //get the campsite name and image url from the form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    //add the new campsite into the DB
    var newCampground = {name: name, image: image, description: desc, author: author};
    Campground.create(newCampground, function(err, campground){
        if(err){
            req.flash("error", "Campground could not be added");
            console.log(err);
        }
        else {
            //redirect page to the campgrounds route
            res.redirect("/campgrounds");
        }
    });
    
});

// CAMPGROUND SHOW ROUTE - show details for one campground
router.get("/:id", function(req, res){
    //find the campground with the given ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            req.flash("error", "Could not load the campground");
            console.log(err);
        }
        else {
            //show campground template
            res.render("campgrounds/show", {campground: foundCampground});         
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, campgroundFound){
        if(err){
            res.redirect("/campgrounds" + req.params.id);
        } else {
            res.render("campgrounds/edit", {campground: campgroundFound});    
        }
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campgroundUpdated){
        if(err){
            console.log("can't update");
        } else {
            req.flash("success", "Campground edited");
            res.redirect("/campgrounds/" + campgroundUpdated._id);
        }
    })
})

//DELETE CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("could not delete");
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;