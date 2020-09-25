var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var userSchema=new Schema({
	 name:{type:String,required:true},
	 email:{type:String,required:true,unique:true},
	password:{type:String,required:true},
	 role:{type:String, default:"customer"}
	
},{
        timestamps:true
});

module.exports=mongoose.model("User",userSchema);
