import product_manager from '../managers/Product.js'

function valid_properties(req, res, next) {
    let properties = Object.keys(req.body)
        .filter(each=>each!=='title')
        .filter(each=>each!=='description')
        .filter(each=>each!=='stock')
        .filter(each=>each!=='price')
        .filter(each=>each!=='url_photo')
    if (properties.length>0) {
        return res.json({ status:400,message:"Insert valid properties!" })
    } else {
        next()
    }

}

export default valid_properties