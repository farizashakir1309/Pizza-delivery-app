const LocalStrategy=require("passport-local").Strategy;
var bcrypt=require("bcrypt");
var User=require("../models/user");

function init(passport){
	passport.use(new LocalStrategy({usernameField:"email" }, async  function(email, password ,done){
		//login
		//check if email exist
		const user= await  User.findOne({email:email})
		if(!user){
			return done (null,false,{mesage:"No user with this email"})
			
		}
		bcrypt.compare(password,user.password).then(function(match){
			if(match){
				return done(null,user,{message:"Logged in successfully"})
			} 
			return done(null,false,{message:"Wrong username or password"});
		}).catch(function(err){
			return done(null,false,{message:"Something went wrong"})
		});
		
	}));
	passport.serializeUser(function(user,done){
		done(null,user._id);
	});
	passport.deserializeUser(function(id,done){
		User.findById(id,function(err,user){
			done(err,user)
		});
	});
}
module.exports=init;