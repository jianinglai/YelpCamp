var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud Atlas",
            image: "https://farm6.staticflickr.com/5475/9705829822_783bcf3477.jpg",
            description: "Lorem ipsum dolor sit amet, an natum exerci signiferumque pri, sit veniam mollis cu, at usu integre dolorem honestatis. Sed ex porro latine, suas lorem laboramus no mea. Dicam graece sea cu, per ex mollis apeirian nominati. Vim primis scribentur persequeris te, has te detracto persequeris, ad oratio audiam per. Ut wisi facilis consulatu sea. Cu dicat pericula duo. Senserit salutatus gubergren has et. Graecis elaboraret appellantur eu mel. Vocent habemus ut eum. Impedit delectus aliquando ad vix, ad vel modus lorem simul. Usu id posse persius aliquid, sea at habeo nulla, sit munere postea laboramus no. Sed eu clita dolores, no vix libris maiorum. Nam cu oratio ceteros salutandi, pri in mucius aperiri. Et nec novum ubique, eos ut labore ceteros consulatu. Id quis blandit deseruisse duo, at quem tempor accommodare mea, vix viderer apeirian ea. At meis nostrum sea. In nonumes ceteros quo, mollis salutatus aliquando ut sea, ex tota graecis disputationi nec."
        },
        {
            name: "Desert Rain",
            image: "https://farm7.staticflickr.com/6009/5933610064_e587c3ea9c.jpg",
            description: "Lorem ipsum dolor sit amet, an natum exerci signiferumque pri, sit veniam mollis cu, at usu integre dolorem honestatis. Sed ex porro latine, suas lorem laboramus no mea. Dicam graece sea cu, per ex mollis apeirian nominati. Vim primis scribentur persequeris te, has te detracto persequeris, ad oratio audiam per. Ut wisi facilis consulatu sea. Cu dicat pericula duo. Senserit salutatus gubergren has et. Graecis elaboraret appellantur eu mel. Vocent habemus ut eum. Impedit delectus aliquando ad vix, ad vel modus lorem simul. Usu id posse persius aliquid, sea at habeo nulla, sit munere postea laboramus no. Sed eu clita dolores, no vix libris maiorum. Nam cu oratio ceteros salutandi, pri in mucius aperiri. Et nec novum ubique, eos ut labore ceteros consulatu. Id quis blandit deseruisse duo, at quem tempor accommodare mea, vix viderer apeirian ea. At meis nostrum sea. In nonumes ceteros quo, mollis salutatus aliquando ut sea, ex tota graecis disputationi nec."
        },
        {
            name: "Mountain's Hope",
            image: "https://farm8.staticflickr.com/7616/16663866990_082fe86c9c.jpg",
            description: "Lorem ipsum dolor sit amet, an natum exerci signiferumque pri, sit veniam mollis cu, at usu integre dolorem honestatis. Sed ex porro latine, suas lorem laboramus no mea. Dicam graece sea cu, per ex mollis apeirian nominati. Vim primis scribentur persequeris te, has te detracto persequeris, ad oratio audiam per. Ut wisi facilis consulatu sea. Cu dicat pericula duo. Senserit salutatus gubergren has et. Graecis elaboraret appellantur eu mel. Vocent habemus ut eum. Impedit delectus aliquando ad vix, ad vel modus lorem simul. Usu id posse persius aliquid, sea at habeo nulla, sit munere postea laboramus no. Sed eu clita dolores, no vix libris maiorum. Nam cu oratio ceteros salutandi, pri in mucius aperiri. Et nec novum ubique, eos ut labore ceteros consulatu. Id quis blandit deseruisse duo, at quem tempor accommodare mea, vix viderer apeirian ea. At meis nostrum sea. In nonumes ceteros quo, mollis salutatus aliquando ut sea, ex tota graecis disputationi nec."
        }
    ];

function seedDB(){
    //remove the campgrounds
    Campground.remove({}, function(err, removed){
        if(err){
            console.log(err);
        } else {
            console.log("campgrounds removed");
            
            //wait until the campgrounds have been removed, then add new seed campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campgroundAdded){
                    if(err){
                        console.log("Could not add seed campground");
                        console.log(err);
                    } else {
                        console.log("Campground added!");
                        
                        Comment.create(
                            {
                                text: "I wish there were internet here.",
                                author: "Jonathan Lai"
                            }, function(err, comment){
                                if(err){
                                    console.log("comment was not added");
                                } else {
                                    campgroundAdded.comments.push(comment);
                                    campgroundAdded.save();
                                    console.log("comment added");
                                }
                        });
                    }
                }); //create campground
            }); //forEach
        } //else
    }); //remove
} //function

module.exports = seedDB;

// //Colt's code
// var mongoose = require("mongoose");
// var Campground = require("./models/campground");
// var Comment   = require("./models/comment");

// var data = [
//     {
//         name: "Cloud's Rest", 
//         image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
//         description: "blah blah blah"
//     },
//     {
//         name: "Desert Mesa", 
//         image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
//         description: "blah blah blah"
//     },
//     {
//         name: "Canyon Floor", 
//         image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
//         description: "blah blah blah"
//     }
// ]

// function seedDB(){
//   //Remove all campgrounds
//   Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//          //add a few campgrounds
//         data.forEach(function(seed){
//             Campground.create(seed, function(err, campground){
//                 if(err){
//                     console.log(err)
//                 } else {
//                     console.log("added a campground");
//                     //create a comment
//                     Comment.create(
//                         {
//                             text: "This place is great, but I wish there was internet",
//                             author: "Homer"
//                         }, function(err, comment){
//                             if(err){
//                                 console.log(err);
//                             } else {
//                                 campground.comments.push(comment);
//                                 campground.save();
//                                 console.log("Created new comment");
//                             }
//                         });
//                 }
//             });
//         });
//     }); 
//     //add a few comments
// }

// module.exports = seedDB;