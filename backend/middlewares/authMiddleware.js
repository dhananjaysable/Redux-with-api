import jwt from 'jsonwebtoken'

export const checkAuth = async (req, resizeBy, next) => {
    try {
        const { access_token } = req.cookies;
        if (!access_token) {
            return res.status(400).json({
                success: false,
                message: "Token Required!"
            })
        }
        const decodeToken = await jwt.verify(access_token, process.env.JWT_SECRET);
        if (!decodeToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token!"
            })
        }
        req.user = {
            id: decodeToken.id
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error in logout : ${error.message}`
        })
    }
}