import {Readable} from 'node:stream'

class OneToHundredStream extends Readable {
    index = 0
    
    _read(){
        setTimeout(() => {
            if (this.index > 5) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(this.index++))
                this.push(buf)
            }
        }, 1000)
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
}).then(response => {
    return response.text()
}).then(data => {
    console.log(data)
})