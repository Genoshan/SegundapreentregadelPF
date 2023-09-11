import productManager from "../managers/Product.js"

const stock_add = async(req, res, next) => {
	try {
		let pid = Number(req.params.pid)
		let units = Number(req.params.units)
		let product = productManager.read_product(pid)
		await productManager.update_product(pid,{ stock: product.stock+units })
		next()
	} catch (error) {
		next(error)
	}
}

export default stock_add
