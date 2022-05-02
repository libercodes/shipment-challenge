import { messages } from './messages'
import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

async function main() {
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i]
        let endpoint = 'shipment'
        if (message.type === 'ORGANIZATION') {
            endpoint = 'organization'
        }

        try {
            await axios.post(`http://localhost:${process.env.PORT}/${endpoint}`, message)
        } catch (error) {
            console.error(error.code)
        }

    }
}

main()