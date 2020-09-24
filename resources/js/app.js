import axios from "axios";
import Noty from "noty";
let addToCart=document.querySelectorAll(".add-to-cart");
let cartCounter=document.querySelector("#cartCounter");
function updateCart(pizza){
	axios.post("/update-cart",pizza).then(function(res){
		console.log(res);
		cartCounter.innerText= res.data.totalQty;
		new Noty({
			type:"success",
			timeout:1000,
			progressBar:false,
			text:"Item added to cart"
		}).show();
	}).catch(function(err){
		new Noty({
			type:"error",
			timeout:1000,
			text:"Something went wrong"
		}).show();
	});
}
addToCart.forEach (function(btn){
	btn.addEventListener("click",function(e){
		
		let pizza=JSON.parse(btn.dataset.pizza);
		//console.log(pizza);
		updateCart(pizza);
	});
});