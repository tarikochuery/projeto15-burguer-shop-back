import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const authController = {
    verifyToken(req, res) {
        const { authorization } = req.headers

        if(!authorization){
            return res.send({valid: false})
        }
        console.log(authorization)
        const token = authorization.replace("Bearer ", "");
        console.log(token)
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.send({valid: false})
            }
            return res.send({valid: true})
        });
    }
}