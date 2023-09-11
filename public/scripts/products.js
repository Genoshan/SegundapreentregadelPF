fetch('/api/products')
    .then(res=>res.json())  //.json() para transformar la respuesta de la petición GET
    //.then(res=>console.log(res.products))
    .then(res=> {
        let templates = res.products.map(each=> {
            if (each.stock>0) {
                return `
                <div class="card m-2" style="width: 13rem;">
                    <img src="${each.url_photo}" class="card-img-top p-3" alt="${each.pid}">
                    <div class="card-body d-flex flex-column justify-content-center">
                        <h5 class="card-title text-center">${each.title}</h5>
                        <p class="card-text text-center">U$D${each.price}</p>
                        <a href="/product.html?id=${each.pid}" class="btn btn-warning">+info</a>
                    </div>
                </div>
            `
            }
            return ''
        }).join('')
        document.getElementById('products').innerHTML = templates
    })
    .catch(err=>console.log(err))