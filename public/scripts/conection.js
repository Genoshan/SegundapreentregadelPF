const socket = io()

socket.on(
    'change_quantity',
    quantity => {
        document.querySelector('#quantity').innerHTML = `CART: ${quantity}`
    }
)