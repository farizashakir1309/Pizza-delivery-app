require("dotenv").config();
var express=require("express");
var app=express();
var ejs=require("ejs");
var path=require("path");
var mongoose=require("mongoose");
var session=require("express-session");
var flash=require("express-flash");
var MongoDbStore=require("connect-mongo")(session);
var connection=mongoose.connection;


// session store
let mongoStore=new MongoDbStore({
	mongooseConnection:connection,
	collection:"sessions"
});


//session config
app.use(session({
	 secret:"process.env.secret",
	 resave :false,
	 store:mongoStore,
	 saveUninitialized:false,
	//change
	 cookies:{maxage:1000*60*60*24}
 }));

app.use(flash());
mongoose.connect("mongodb://localhost/pizza");


app.use(express.static("public"));
 app.use(express.json());

//global middelware
app.use(function(req, res, next){
	 res.locals.session=req.session;
	next();
});

var expressLayout=require("express-ejs-layouts");
var PORT=process.env.PORT || 3300;
app.use(express.static("public"));


//SCHEMA SETUP





app.use(expressLayout);
 app.set("views",path.join(__dirname,"/resources/views"));
app.set("view engine","ejs");







require("./routes/web")(app);






//set templte engine




app.listen(PORT,function(){
	console.log("Listening on port 3300");
})