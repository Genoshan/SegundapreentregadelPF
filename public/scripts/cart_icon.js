async function fetchQuantity() {
    try {
        let response = await fetch('/api/carts/1')
        response = await response.json()
        //console.log(response)
        response = response.cart.products.filter(each=> each.quantity>0).length
        document.getElementById('quantity').innerHTML = `CART: ${response}`
    } catch (error) {
        console.log(error);
    }
}
fetchQuantity()