import server from "./app.js"
import { Server } from "socket.io"
import cart_manager from "./managers/Cart.js"

const PORT = process.env.PORT || 8080
const ready = ()=> console.log('server ready on port '+PORT)

let http_server = server.listen(PORT,ready)
let socket_server = new Server(http_server)

socket_server.on(       //on sirve para escuchar los mensajes que llegan (en este caso del cliente)
    'connection',       //identificador del mensaje a escuchar (el primero siempre connection)
    socket => {         //callback que se va a ejecutar apenas se conecta un cliente
        //console.log(socket)
        console.log(`client ${socket.client.id} connected`)
        socket.emit('change_quantity',cart_manager.read_cart(1).products.length)
        socket.on('upd_cart', ()=> socket_server.emit('change_quantity',cart_manager.read_cart(1).products.length))
    }
)