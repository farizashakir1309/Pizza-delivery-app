var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var menuSchema=new Schema({
	 name:{type:String,required:true},
	 image:{type:String,required:true},
	 price:{type:Number,required:true},
	 size:{type:String,required:true},
});

var Menu=mongoose.model("Menu",menuSchema);
module.exports=Menu;