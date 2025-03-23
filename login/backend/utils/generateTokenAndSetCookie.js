// export const generateVerificationCode = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString()
// }


import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY,{
        expiresIn: '12h'
    })
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict", //csrf
        maxAge: 12 * 60 * 60 * 1000 //12 hours
    })
    return token
}


