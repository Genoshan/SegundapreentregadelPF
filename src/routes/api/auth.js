import { Router } from "express"
import uploader from '../../middlewares/multer.js'
import manager from "../../managers/User.js"
import is_form_ok from "../../middlewares/is_form_ok.js";
import is_8_char from "../../middlewares/is_8_char.js";
import create_hash from "../../middlewares/create_hash.js";
import is_valid_pass from "../../middlewares/is_valid_pass.js";
import create_token from "../../middlewares/create_token.js";
import passport from "passport";



const router = Router()

router.post("/register",is_form_ok,is_8_char,create_hash,
    passport.authenticate("register"),
    async (req, res, next) => {
        try {
            console.log(req.user);
            return res.status(201).json({
                success: true,
                message: "user registered",
                user_id: req.user._id,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post("/login",is_8_char,passport.authenticate("login"),
    is_valid_pass,create_token,async (req, res, next) => {
      try {
        req.session.mail = req.body.mail;
        req.session.role = req.user.role;
        return res
          .status(200)
          .cookie("token", req.session.token, {
            maxAge: 60 * 60 * 24 * 7 * 1000,
            httpOnly: false,
          })
          .json({
            user: req.user,
            //session: req.session,
            message: req.session.mail + " inicio sesión",
            token: req.session.token,
          });
      } catch (error) {
        next(error);
      }
    }
  );
  
  router.post("/signout",passport.authenticate("jwt"),
    async (req, res, next) => {
      try {
        console.log(req.session);
        req.session.destroy();
        return res.status(200).clearCookie("token").json({
          success: true,
          message: "sesion cerrada",
          response: req.session,
        });
      } catch (error) {
        next(error);
      }
    }
  );

router.post('/signup',uploader.single('url_photo'), async(req,res,next)=> {
    console.log('hola');
    try {
        if (!req.file) {
            return res.send('no se pudo cargar la imagen')
        }
        console.log(req.file)
        const { name,last_name,age } = req.body
        let user = { name,last_name,age }   //construyo el usuario
        user.url_photo = req.file.path      //agrego la ruta de la foto
        await manager.add_user(user)        //creo un usuario
        return res.json({                   //envio la respuesta
            status: 201,
            message: 'user created'
        })
    } catch(error) {
        next(error)
    }
})

export default router