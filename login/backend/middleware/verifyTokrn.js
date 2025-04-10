import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({success: false, message: "Unauthorized user (no token)" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if(!decoded){
            return res.status(401).json({success: false, message: "Unauthorized user (invalid token)"})
        }

        req.userId = decoded.userId
        next()
        
    } catch (error) {
        console.log('Error at verifyToken in token verification ', error)
        return res.status(401).json({success: false, message: "Server Error"})
    }
}