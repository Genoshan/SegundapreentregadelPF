import cart_manager from '../managers/Cart.js'

function exists_cart (req, res, next) {
    let data = cart_manager.read_cart(Number(req.params.cid))
    if (data) {
        next()
    } else {
        return res.json({ status:400,message:"Not found cart!" })
    }
    
}

export default exists_cart