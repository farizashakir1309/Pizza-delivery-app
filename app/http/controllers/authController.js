var User=require("../../models/user");
const bcrypt=require("bcrypt");
var passport=require("passport");
function authController(){
	//factory functions CRUD	
	return{
		login:function(req,res){
			res.render("auth/login");
		},
		postLogin(req,res,next){
		 passport.authenticate("local",function(err,user,info){
			 if(err){
				 req.flash("error",info.message);
				 return next(err);
			 }
			 if(!user){
				 req.flash("error",info.message);
				 return res.redirect("/login");
			 }
			 req.logIn(user,function(err){
				 if(err){
					 req.flash("error",info.message)
					 return next(err)
				 }
				 return res.redirect("/");
			 })
		 })	(req,res,next)
		},
		register(req,res){
			res.render("auth/register");
		},
		async postRegister(req,res){
			const{ name,email,password}=req.body;
			//validate request
			if(!name||!email||!password){
				req.flash("error","all fields are required");
				req.flash("name",name);
				req.flash("email",email);
				
				return res.redirect("/register");
			}
			//check if email exists
			User.exists({email:email},function(err,result){  if(result){
			req.flash("error","Email already exists");
				req.flash("name",name);
				req.flash("email",email);	            
				return res.redirect("/register");
			}
			});
			
			//hash password
			var hashedPassword=await bcrypt.hash(password,10);
			
			//create a user
			var user=new User({
				name:name,
				email:email,
				password:hashedPassword
			});
			user.save().then(function(user){
				return res.redirect("/");
				console.log(user);
			}).catch(function(err){
				//req.flash("error","Something went wrong");
				console.log(err);
				return res.redirect("/register");
			});
		
		},
		logout(req,res){
			req.logout()
			return res.redirect("/login");
		}
	}
}
module.exports=authController;