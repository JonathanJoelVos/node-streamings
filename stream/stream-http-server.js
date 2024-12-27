import http from "node:http"
import { Transform} from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = Number(chunk.toString())
        const inverse = number * -1
        console.log(inverse)
        const buf = Buffer.from(String(inverse))
        callback(null, buf)
    }
}

const server = http.createServer(async (req, res) => {
    const buffer = []

    for await (const chunk of req) {
        buffer.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffer).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)
    
})

server.listen(3334)