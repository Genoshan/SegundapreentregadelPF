const params = new URLSearchParams(location.search)
//console.log(params)
const cid = params.get('cid')
//console.log(cid)

async function fetchCart() {
    try {
        let response = await fetch('/api/carts/'+cid)
        response = await response.json()
        //console.log(response)
        let templates = ''
        let total = 0
        for (let prod of response.cart.products) {
            if (prod.quantity>0) {
                let res = await fetch('/api/products/'+prod.pid)
                res = await res.json()
                //console.log(res)
                total = total + prod.quantity * res.product.price
                templates = templates + `
                    <div class="card m-2 d-flex flex-row justify-content-center align-items-center">
                        <img src="${res.product.url_photo}" class="card-img-top p-3 m-0" style="width: 100px" alt="${res.product.title}">
                        <p class="card-text text-center p-2 m-0" style="width: 100px">${res.product.title}</p>
                        <input id="q${res.product.pid}" onclick="quitUnits(${res.product.pid})" type="button" style="width: 25px" class="quit-units btn btn-danger p-1 m-1" value="-">
                        <input type="text" disabled id="qu${res.product.pid}" class="card-text text-center p-2 m-0" style="width: 50px" value=${prod.quantity}>
                        <input id="a${res.product.pid}" onclick="addUnits(${res.product.pid})" type="button" style="width: 25px" class="btn btn-success p-1 m-1" value="+">
                        <p id="p${res.product.pid}" class="card-text text-center p-2 m-0" style="width: 100px">U$D${res.product.price}</p>
                    </div>
                `
            }
        }
        templates = templates + `                                
            <div class="card m-2 d-flex flex-row justify-content-center align-items-center">
                <p class="card-text text-end p-2 m-0" style="width: 400px">TOTAL: U$D${total}</p>
            </div>
        `
        document.getElementById('cart').innerHTML = templates
    } catch (error) {
        console.log(error);
    }
}
fetchCart()

async function addUnits(pid) {
    try {
        let response = await fetch(`/api/carts/${cid}/product/${pid}/1`, {
            method: 'PUT'
        })
        response = await response.json()
        //console.log(response);
        if (response.status===200) {
            location.replace('/cart.html?cid='+cid)
        }else {
            alert(response.message)
        }
    } catch (error) {
        console.log(error);
    }
}

async function quitUnits(pid) {
    try {
        let response = await fetch(`/api/carts/${cid}/product/${pid}/1`, {
            method: 'DELETE'
        })
        response = await response.json()
        //console.log(response);
        if (response.status===200) {
            location.replace('/cart.html?cid='+cid)
        }else {
            alert(response.message)
        }
    } catch (error) {
        console.log(error);
    }
}                     