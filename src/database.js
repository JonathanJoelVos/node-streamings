import fs from "node:fs/promises"

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor(){
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, search) {
        let data = this.#database[table] ?? []

        //search: {name: 'teste', email: 'teste'}
        //[['name', 'teste'], ['email', 'teste']]
        //para cada um dos itens do array temos [key, value]
        if (search) {
            console.log(search)
            data = data.filter(row => {
                console.log(row, 'row')
                return Object.entries(search).some(([key, value]) => 
                { 
                    console.log(key, value, row[key].toLowerCase().includes(value.toLowerCase()))
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
        
        return data
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()
        
        return data
    }

    update(table, id, data){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1){
            this.#database[table][rowIndex] = {...data, id}
            this.#persist()
        }
    }

    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}