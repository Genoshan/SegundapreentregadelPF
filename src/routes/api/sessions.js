import { Router } from "express"
const sessions_router = Router()

sessions_router.get('/',async(req,res)=> {
    console.log(req.session)
    return res.status(200).json({
        success: true,
        email: req.session.email 
    })
})

sessions_router.post('/login',async(req,res,next)=> {
    try {
        const { email } = req.body
        req.session.email = email
        return res.status(200).json({
            success: true,
            message: email+' ha iniciado sesión'
        })
    } catch (error) {
        next(error)
    }
})

sessions_router.post('/signout',async(req,res,next)=> {
    try {
        req.session.destroy()
        return res.status(200).json({
            message: 'ha cerrado sesión'
        })
    } catch (error) {
        next(error)
    }
})

sessions_router.post('/current',async(req,res,next)=> {
    try {
        const { user } = req.body
        req.session.user = user
        return res.status(200).json({
            success: true,
            message: user+' es el usuario actual'
        })
    } catch (error) {
        next(error)
    }
})

export default sessions_router