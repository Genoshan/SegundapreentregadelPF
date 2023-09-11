import { Router } from "express"
import manager from './../../managers/Product.js'
import validator_product from '../../middlewares/validator_product.js'
import next_id_product from '../../middlewares/next_id_product.js'
import exists_product from "../../middlewares/exists_product.js"
import valid_properties from "../../middlewares/valid_props_product.js"
import auth from '../../middlewares/auth.js'

const router = Router()

router.post('/', auth, validator_product, next_id_product, async(req,res,next)=> {
    try {
        await manager.add_product(req.body)
        return res.status(201).json({ status:201,message:'Product created!' })
    } catch(error) {
        next(error)
    }
})

router.get('/', async(req,res,next)=> {
    try {
        let products = manager.read_products()
        if (products.length>0) {
            return res.json({ status:200,products })
        }
        return res.json({ status:404,message:'Not found!' })
    } catch(error) {
        next(error)
    }
})

router.get('/:pid', exists_product, async(req,res,next)=> {
    try {
        let id = Number(req.params.pid)
        let one = manager.read_product(id)
        return res.json({ status:200,product:one })
    } catch(error) {
        next(error)
    }
})

router.put('/:pid', exists_product, valid_properties, async(req,res,next)=> {
    try {
        let id = Number(req.params.pid)
        let data = req.body
        await manager.update_product(id,data)
        return res.json({ status:200,message:'Product updated!' })

    } catch(error) {
        next(error)
    }
})

router.delete('/:pid', exists_product, async(req,res,next)=> {
    try {
        let id = Number(req.params.pid)
        await manager.destroy_product(id)
        return res.json({ status:200,message:'Product deleted!' })
    } catch(error) {
        next(error)
    }
})

export default router