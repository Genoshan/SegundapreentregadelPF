import cartManager from "../managers/Cart.js"

const is_quantity = (req, res, next) => {
	let cid = Number(req.params.cid)
	let pid = Number(req.params.pid)
	let units = Number(req.params.units)
	let quantity = cartManager.read_cart(cid).products.find(each=>each.pid===pid).quantity
	if (units <= quantity) {
		next()
	} else {
		return res.json({ status:400,message:"There are not enough products in your cart!" })
	}
}

export default is_quantity
