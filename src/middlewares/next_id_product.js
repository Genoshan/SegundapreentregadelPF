import product_manager from '../managers/Product.js'

function next_id(req, res, next) {
    let data = product_manager.read_products()
    if (data.length>0) {
        let next_id = data[data.length-1].pid+1
        req.body.pid = next_id
    } else {
        req.body.pid = 1
    }
    next()
}

export default next_id