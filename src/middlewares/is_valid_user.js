import User from "../models/user.model.js"

export default async function(req,res,next) {
    try {
        const { mail } = req.body
        let one = await User.findOne({ mail })
        console.log(one);
        if (one) {
            return next()
        } else {
            return res.status(400).json({
                status: 400,
                method: req.method,
                path: req.url,
                response: 'invalid credential'
            })
        }
    } catch (error) {
        return next(error)
    }
}