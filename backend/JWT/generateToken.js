import jwt from "jsonwebtoken"

const generatetoken = (id,res) => {

    const token = jwt.sign({id},process.env.JWT_SECRETE,{
        expiresIn:"15d",
    })

    res.cookie("jwt",token,{
       maxAge: 15* 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite:"strict" 
    })

}

export default generatetoken;