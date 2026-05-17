const jwt =
require('jsonwebtoken');

// ========================================
// AUTH MIDDLEWARE
// ========================================

module.exports = (

    req,
    res,
    next

) => {

    try{

        // ========================================
        // AUTH HEADER
        // ========================================

        const authHeader =
        req.headers.authorization;

        // ========================================
        // TOKEN VALIDATION
        // ========================================

        if(

            !authHeader ||

            !authHeader.startsWith(
                'Bearer '
            )

        ){

            return res.status(401).json({

                success:false,

                message:
                'Token não encontrado.'

            });

        }

        // ========================================
        // GET TOKEN
        // ========================================

        const token =
        authHeader.split(' ')[1];

        // ========================================
        // VERIFY TOKEN
        // ========================================

        const decoded =
        jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        // ========================================
        // USER DATA
        // ========================================

        req.user = decoded;

        // ========================================
        // NEXT
        // ========================================

        next();

    } catch(error){

        // ========================================
        // INVALID TOKEN
        // ========================================

        return res.status(401).json({

            success:false,

            message:
            'Token inválido.',

            error:error.message

        });

    }

};
