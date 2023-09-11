import cart_manager from '../managers/Cart.js'

function next_id(req, res, next) {
    let data = { products: [] }
    let carts = cart_manager.read_carts()
    if (carts.length>0) {
        let next_id = carts[carts.length-1].cid+1
        data.cid = next_id
    } else {
        data.cid = 1
    }
    req.body = data
    next()
}

export default next_id