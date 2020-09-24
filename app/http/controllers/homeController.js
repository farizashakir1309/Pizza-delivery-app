var Menu=require("../../models/menu");
 Menu.create(
 {
	 name:"Veg Loaded",
	 image:"https://www.dominos.co.in/files/items/PrimeLoadedL.jpg",
	 price:250,
	 size:"small"
 },function(err,Menu){
	 if(err){
		 console.log(err);
	 }else{
		 console.log(Menu);
	 }
 });
function homeController(){
	//factory functions CRUD	
	return{
		index:function(req,res){
			Menu.find().then(function(pizzas){
				//console.log(pizzas);
			return res.render("home",{pizzas:pizzas});				 
							 });
			
		}
	}
}
module.exports=homeController;