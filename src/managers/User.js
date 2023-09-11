import fs from 'fs'

class User {
    constructor(path) {
        this.users = []
        this.path = path
        this.init(path)
    }
    init(path) {
        let file = fs.existsSync(path)
        if (!file) {
            fs.writeFileSync(path,'[]')
        } else {
            this.users = JSON.parse(fs.readFileSync(path,'UTF-8'))
        }
        return true
    }
    async add_user({ name,last_name,age,url_photo }) {
        try {
            if (name&&last_name&&age&&url_photo) {
                if (this.users.length>0) {
                    let next_id = this.users[this.users.length-1].id+1
                    data.id = next_id
                } else {
                    data.id = 1
                }
                this.users.push(data)
                let data_json = JSON.stringify(this.users,null,2)
                await fs.promises.writeFile(this.path,data_json)
                return true
            }
            return false
        } catch(error) {
            console.log(error)
            return false
        }
    }
    read_users() {
        //console.log(this.users)
        return this.users
    }
    read_user(id) {
        let one = this.users.find(each=>each.id===id)
        //console.log(one)
        return one
    }
    async update_user(id,data) {
        try {
            let one = this.read_user(id)
            let properties = Object.keys(data).length
            if (one&&properties) {
                for (let prop in data) {
                    one[prop] = data[prop]
                }
                let data_json = JSON.stringify(this.users,null,2)
                await fs.promises.writeFile(this.path,data_json)
                return true
            }
            return false
        } catch(error) {
            console.log(error)
            return false
        }
    }
    async destroy_user(id) {
        try {
            let one = this.read_user(id)
            if (one) {
                this.users = this.users.filter(each=>each.id!==id)
                let data_json = JSON.stringify(this.users,null,2)
                await fs.promises.writeFile(this.path,data_json)
                return true
            }
            return false
        } catch(error) {
            console.log(error)
            return false
        }
    }
}

let manager = new User('./src/data/users.json')

export default manager