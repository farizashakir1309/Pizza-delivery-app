require("dotenv").config();
var express=require("express");
var app=express();
var ejs=require("ejs");
var path=require("path");
var mongoose=require("mongoose");
var session=require("express-session");
var flash=require("express-flash");
var MongoDbStore=require("connect-mongo")(session);
var passport=require("passport");
var connection=mongoose.connection;
var Emitter=require("events");



// session store
let mongoStore=new MongoDbStore({
	mongooseConnection:connection,
	collection:"sessions"
});

//event emitter
var eventEmitter=new Emitter();
app.set("eventEmitter",eventEmitter);
//session config
app.use(session({
	 secret:"process.env.secret",
	 resave :false,
	 store:mongoStore,
	 saveUninitialized:false,
	//change
	 cookies:{maxage:1000*60*60*24}
 }));

//passport config
const passportInit=require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());




app.use(flash());
mongoose.connect("mongodb://localhost/pizza");


app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
 app.use(express.json());

//global middelware
app.use(function(req, res, next){
	res.locals.user=req.user;
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




var server=app.listen(PORT,function(){
	console.log("Listening on port 3300");
});
//socket
var io=require("socket.io")(server);
io.on("connection",function(socket ){
	//join 
	socket.on("join",function(orderId){
		socket.join(orderId); 
	});
})
eventEmitter.on("orderUpdated",function(data){
	io.to(`order_$({data.id}`).emit("orderUpdated",data);
})

eventEmitter.on("orderPlaced",function(data){
	io.to("adminRoom").emit("orderPlaced",data)
})