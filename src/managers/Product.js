import fs from 'fs'

class Product {
    constructor(path) {
        this.products = []
        this.path = path
        this.init(path)
    }
    init(path) {
        let file = fs.existsSync(path)
        if (!file) {
            fs.writeFileSync(path,'[]')
        } else {
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
        }
        return true
    }
    async add_product(data) {
        try {
            this.products.push(data)
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            return true
        } catch(error) {
            console.log(error)
            return false
        }
    }
    read_products() {
        return this.products
    }
    read_product(id) {
        return this.products.find(each=>each.pid===id)
    }
    async update_product(id,data) {
        try {
            let one = this.read_product(id)
            for (let prop in data) {
                one[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            return true
        } catch(error) {
            console.log(error)
            return false
        }
    }
    async destroy_product(id) {
        try {
            this.products = this.products.filter(each=>each.id!==id)
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            return true
        } catch(error) {
            console.log(error)
            return false
        }
    }
}

let manager = new Product('./src/data/products.json')

export default manager