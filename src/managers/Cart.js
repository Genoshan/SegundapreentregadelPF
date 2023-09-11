import fs from 'fs'
import product_manager from './Product.js'

class Cart {

    constructor(path) {
        this.carts = []
        this.path = path
        this.init(path)
    }

    init(path) {
        let file = fs.existsSync(path)
        if (!file) {
            fs.writeFileSync(path,'[]')
        } else {
            this.carts = JSON.parse(fs.readFileSync(path,'UTF-8'))
        }
        return true
    }

    async add_cart(data) {
        try {
            this.carts.push(data)
            let data_json = JSON.stringify(this.carts,null,2)
            await fs.promises.writeFile(this.path,data_json)
            return true
        } catch(error) {
            console.log(error)
            return false
        }
    }

    read_carts() {
        return this.carts
    }

    read_cart(id) {
        return this.carts.find(each=>each.cid===id)
    }

    async update_cart(id,data) {
        try {
            let one = this.read_cart(id)
            let products = one.products.map(each=>each.pid)
            if (products.includes(data.pid)) {
                one.products[products.indexOf(data.pid)] = {
                    pid: data.pid,
                    quantity: one.products[products.indexOf(data.pid)].quantity+data.quantity
                }
            } else {
                one.products.push(data)
            }
            let data_json = JSON.stringify(this.carts,null,2)
            await fs.promises.writeFile(this.path,data_json)
            return true
        } catch(error) {
            console.log(error)
            return false
        }
    }

    async destroy_cart(id,data) {
        try {
            let one = this.read_cart(id)
            let products = one.products.map(each=>each.pid)
            if (products.includes(data.pid)) {
                one.products[products.indexOf(data.pid)] = {
                    pid: data.pid,
                    quantity: one.products[products.indexOf(data.pid)].quantity-data.quantity
                }
            } else {
                one.products.push(data)
            }
            let data_json = JSON.stringify(this.carts,null,2)
            await fs.promises.writeFile(this.path,data_json)
            return true
        } catch(error) {
            console.log(error)
            return false
        }
    }
}

let manager = new Cart('./src/data/carts.json')

export default manager