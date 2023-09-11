import product_manager from '../managers/Product.js'

function exists_product (req, res, next) {
    let data = product_manager.read_product(Number(req.params.pid))
    if (data) {
        next()
    } else {
        return res.json({ status:400,message:"Not found product!" })
    }
    
}

export default exists_product