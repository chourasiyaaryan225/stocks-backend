import jwt from "jsonwebtoken"
export const verifyToken = (token)=>{
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        return decoded.id
    }catch(error){
        return null
    }
}
export const getToken = (payload)=>{
    try{
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"})
        return token
    }catch(error){
        return null
    }
}