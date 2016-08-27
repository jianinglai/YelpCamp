var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ==================
// Comments routes
// ==================

// COMMENT NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
          console.log(err);
      } else {
          res.render("comments/new", {campground: foundCampground});
      }
   }); 
});

// COMMENT CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
   //look up the campground by ID
   //create the new comment
   //associate the comment to the campground
   //redirect to show page of that campground
  
   Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
          req.flash("error", "Something went wrong");
          console.log(err);
      } else {
          Comment.create(req.body.comment, function(err, comment){
             if(err){
                 console.log(err);
             } else {
                 //add username and id to comment
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username;
                 //save comment
                 comment.save();
                 
                 //add comment to campground and save
                 foundCampground.comments.push(comment);
                 foundCampground.save();
                 req.flash("success", "Comment added");
                 res.redirect("/campgrounds/" + foundCampground._id);
             }
          });
      }
   }); 
});

// EDIT COMMENT ROUTE
router.get("/:commentID/edit", middleware.checkCommentOwnership, function(req, res){
    //find the campground object
    Campground.findById(req.params.id, function(err, campgroundFound){
        if(err){
            console.log(err);
        } else {
            //find the comment object
            Comment.findById(req.params.commentID, function(err, commentFound){
                if(err){
                    console.log(err);
                } else {
                    //pass the campground and comment objects into the edit form
                    res.render("comments/edit", {campground: campgroundFound, comment: commentFound});
                }  
            });
        }
    });
});

// UPDATE COMMENT ROUTE
router.put("/:commentID", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.commentID, req.body.comment, function(err, commentUpdated){
       if(err){
           console.log(err);
       } else {
           req.flash("success", "Comment updated");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) 
});

// DESTROY COMMENT ROUTE
router.delete("/:commentID", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.commentID, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Comment removed");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

module.exports = router;