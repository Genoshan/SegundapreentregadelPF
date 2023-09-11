import productManager from "../managers/Product.js"

const is_stock = (req, res, next) => {
	let pid = Number(req.params.pid)
	let units = Number(req.params.units)
	let stock = productManager.read_product(pid).stock
	if (units <= stock) {
		next()
	} else {
		return res.json({ status:400,message:"There are not enough products available!" })
	}
}

export default is_stock
