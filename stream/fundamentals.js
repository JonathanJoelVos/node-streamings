import {Readable, Writable, Transform} from 'node:stream'

// process.stdin.pipe(process.stdout)

class OneToHundredStream extends Readable {
    index = 0
    
    _read(){
        setTimeout(() => {
            if (this.index > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(this.index++))
                this.push(buf)
            }
        }, 1000)
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = Number(chunk.toString())
        const inverse = number * -1
        const buf = Buffer.from(String(inverse))
        callback(null, buf)
    }
}

new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplyByTenStream())