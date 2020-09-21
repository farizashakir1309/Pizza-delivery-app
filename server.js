var express=require("express");
var app=express();
var ejs=require("ejs");
var path=require("path");
var expressLayout=require("express-ejs-layouts");
var PORT=process.env.PORT || 3300;
app.use(express.static("public"));



app.use(expressLayout);
 app.set("views",path.join(__dirname,"/resources/views"));
app.set("view engine","ejs");







app.get("/",function(req,res){
	res.render("home");
});

 app.get("/cart",function(req,res){
	 res.render("customers/cart");
 });

app.get("/login",function(req,res){
	res.render("auth/login");
});
app.get("/register",function(req,res){
	res.render("auth/register");
});





//set templte engine




app.listen(PORT,function(){
	console.log("Listening on port 3300");
})