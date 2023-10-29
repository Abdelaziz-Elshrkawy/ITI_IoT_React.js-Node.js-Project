import { verify } from "jsonwebtoken"
import { jwt_secret } from "../env"


const Authorization = (req, res, next) => {
    try {
        const token = req.headers.Authorization?.split(' ')
        const decoding = verify(token[1], jwt_secret)
        return 
    } catch (err) {

    }
}
