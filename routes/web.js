
var homeController=require("../app/http/controllers/homeController");
var authController=require("../app/http/controllers/authController");
var cartController=require("../app/http/controllers/customers/cartController");
var guest=require("../app/http/middleware/guest");

function initRoutes(app){
	
	app.get("/",homeController().index);

	 app.get("/cart",cartController().index);

app.get("/login",guest,authController().login);
	app.post("/login",authController().postLogin);

app.get("/register",guest,authController().register);
	app.post("/register",authController().postRegister);
	
	app.post("/logout",authController().logout);
	
	app.post("/update-cart",cartController().update);

}
module.exports=initRoutes;