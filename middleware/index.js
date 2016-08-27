var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

// ==================
// middleware to check user authorization
// ==================
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    
    if (req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, campgroundFound){
                if(err){
                    req.flash("error", "Campground not found");
                    res.redirect("back");
                } else {
                    //do they own the campground?
                    if(campgroundFound.author.id.equals(req.user._id)){
                        next();   
                    }
                    else {
                        req.flash("error", "You don't have permission");
                        res.redirect("back");
                    }
                }
            });
        } 
        //redirect somewhere
        else {
            req.flash("error", "Please log in first");
            res.redirect("back");  
        }
};

// ==================
// middleware to check user authorization
// ==================
middlewareObj.checkCommentOwnership = function(req, res, next){

    if (req.isAuthenticated()){
            Comment.findById(req.params.commentID, function(err, commentFound){
                if(err){
                    req.flash("error", "cannot find the comment");
                    res.redirect("back");
                } else {
                    //do they own the comment?
                    if(commentFound.author.id.equals(req.user._id)){
                        next();   
                    }
                    else {
                        req.flash("error", "You can't edit the comment");
                        res.redirect("back");
                    }
                }
            });
        } 
        //redirect somewhere
        else {
            req.flash("error", "You need to log in first");
            res.redirect("back");  
        }
};

// ==================
// middleware to detect if user is logged in
// ==================
middlewareObj.isLoggedIn = function(req,res, next){
  if(req.isAuthenticated()){
      return next();
  }  else {
      req.flash("error", "Please log in first");
      res.redirect("/login");
  }
};

module.exports = middlewareObj;