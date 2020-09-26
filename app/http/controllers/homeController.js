var Menu=require("../../models/menu");
 
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