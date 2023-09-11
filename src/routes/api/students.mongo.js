import { Router } from "express";
import Student from "../../models/student.model.js";

const router = Router()

router.post('/',async(req,res,next)=> {
    try {
        let one = await Student.create(req.body)
        if (one) {
            return res.json({
                status: 201,
                message: 'student created',
                id: one._id
            })
        }
    } catch (error) {
        next(error)
    }
})

router.get('/',async(req,res,next)=> {
    try {
        let all = await Student.find().select('name age -_id')
        if (all) {
            return res.json({
                status: 200,
                response: all
            })
        }
    } catch (error) {
        next(error)
    }
})

router.put('/:sid',async(req,res,next)=> {
    try {
        console.log(req.params.sid);
        console.log(req.body);
        let one = await Student.findByIdAndUpdate(req.params.sid,req.body)
        console.log(one);
        if (one) {
            return res.json({
                status: 200,
                message: 'updated!'
            })
        }
    } catch (error) {
        next(error)
    }
})

router.delete('/:sid',async(req,res,next)=> {
    try {
        let one = await Student.findByIdAndDelete(req.params.sid)
        if (one) {
            return res.json({
                status: 200,
                message: 'deleted'
            })
        }
    } catch (error) {
        next(error)
    }
})


export default router