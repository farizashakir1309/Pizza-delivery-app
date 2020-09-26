var Order=require("../../../models/order")

function statusController(){
	return{
		update(req,res){
			Order.updateOne({_id:req.body.orderId},{status:req.body.status},function(err,data){
				if(err){
					return res.redirect("/admin/orders");
				}
				//emit event
				var eventEmitter=req.app("eventEmitter");
				eventEmitter.emit("orderUpdated",{id:req.body.orderId,status:req.body.status})
				return res.redirect("/admin/orders");
			})
		}
	}
}
module.exports=statusController;