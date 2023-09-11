import { Router } from "express"
import manager from './../../managers/Cart.js'
import next_id_cart from "../../middlewares/next_id_cart.js"
import exists_product from "../../middlewares/exists_product.js"
import exists_cart from "../../middlewares/exists_cart.js"
import is_stock from "../../middlewares/is_stock.js"
import stock_quit from "../../middlewares/stock_quit.js"
import is_quantity from "../../middlewares/is_quantity.js"
import stock_add from "../../middlewares/stock_add.js"

const router = Router()

router.post('/', next_id_cart, async(req,res,next)=> {
    try {
        await manager.add_cart(req.body)
        return res.json({ status:201,message:'Cart created!' })
    } catch(error) {
        next(error)
    }
})
router.get('/', async(req,res,next)=> {
    try {
        let all = manager.read_carts()
        if (all.length>0) {
            return res.json({ status:200,carts:all })
        }
        return res.json({ status:404,message:'Not found!' })
    } catch(error) {
        next(error)
    }
})
router.get('/:cid', exists_cart, async(req,res,next)=> {
    try {
        let id = Number(req.params.cid)
        let one = manager.read_cart(id)
        return res.json({ status:200,cart:one })
    } catch(error) {
        next(error)
    }
})
router.put('/:cid/product/:pid/:units', exists_cart, exists_product, is_stock, stock_quit, async(req,res,next)=> {
    try {
        let cid = Number(req.params.cid)
        let pid = Number(req.params.pid)
        let quantity = Number(req.params.units)
        let data = { pid,quantity }
        await manager.update_cart(cid,data)
        return res.json({ status:200,message:'Products added!' })
    } catch(error) {
        next(error)
    }
})
router.delete('/:cid/product/:pid/:units', exists_cart, exists_product, is_quantity, stock_add, async(req,res,next)=> {
    try {
        let cid = Number(req.params.cid)
        let pid = Number(req.params.pid)
        let quantity = Number(req.params.units)
        let data = { pid,quantity }
        await manager.destroy_cart(cid,data)
        return res.json({ status:200,message:'Products quited!' })
    } catch(error) {
        next(error)
    }
})

export default router