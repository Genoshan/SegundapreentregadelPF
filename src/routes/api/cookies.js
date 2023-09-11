import { Router } from "express";

const cookies_router = Router()

//para setear una cookie (CON LA PROP SIGNED LA COOKIE QUEDA FIRMADA)
cookies_router.get('/set',(req,res)=> {
    return res.status(200).cookie(
        'nombre_de_la_clave',
        'objeto',
        { 
            maxAge:200000,
            signed:true
        }
    ).json({
        success: true,
        message: 'cookie seteada'
    })
})
//para leer una cookie SIN FIRMA
cookies_router.get('/',(req,res)=> {
    //console.log(req);
    return res.status(200).json({
        success: true,
        cookies: req.cookies
    })
})
//para leer una cookie CON FIRMA
cookies_router.get('/get',(req,res)=> {
    return res.status(200).json({
        success: true,
        cookies: req.signedCookies
    })
})
//para borrar una cookie
cookies_router.get('/delete',(req,res)=> {
    return res.status(200).clearCookie('nombre_de_la_clave').json({
        success: true,
        message: 'cookie borrada'
    })
})

//para setear una cookie con mail(CON LA PROP SIGNED LA COOKIE QUEDA FIRMADA)
cookies_router.get('/set/:email',(req,res)=> {
    const { email } = req.params
    return res.status(200).cookie(
        'user',
        email,
        { 
            maxAge:60000,
            signed:true
        }
    ).json({
        success: true,
        message: 'cookie seteada'
    })
})



export default cookies_router