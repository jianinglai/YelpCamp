var express                  = require("express"),
    app                      = express(),
    mongoose                 = require("mongoose"),
    bodyParser               = require("body-parser"),
    flash                    = require("connect-flash"),
    passport                 = require("passport"),
    LocalStrategy            = require("passport-local"),
    passportLocalMongoose    = require("passport-local-mongoose"),
    methodOverride           = require("method-override"),
    Campground               = require("./models/campground"),
    Comment                  = require("./models/comment"),
    User                     = require("./models/user"),
    seedDB                   = require("./seeds");
    
var campgroundRoutes         = require("./routes/campgrounds"),
    commentRoutes            = require("./routes/comments"),
    indexRoutes              = require("./routes/index");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

mongoose.connect("mongodb://localhost/yelp_camp_v11");

//seedDB(); //seed the database

// PASSPORT CONFIGURATION   
app.use(require("express-session")(
    {
        secret: "Campgrounds are fun",
        resave: false,
        saveUninitialized: false
    }
));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// ==================
// start server
// ==================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started");
})