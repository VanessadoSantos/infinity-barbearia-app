const bcrypt =
require('bcryptjs');

const jwt =
require('jsonwebtoken');

const User =
require('../models/User');

// ========================================
// REGISTER
// ========================================

exports.register =
async (req, res) => {

    try{

        const {

            name,

            email,

            password

        } = req.body;

        // ========================================
        // VALIDATION
        // ========================================

        if(

            !name ||

            !email ||

            !password

        ){

            return res.status(400).json({

                success:false,

                message:
                'Preencha todos os campos.'

            });

        }

        // ========================================
        // USER EXISTS
        // ========================================

        const userExists =
        await User.findOne({

            email

        });

        if(userExists){

            return res.status(400).json({

                success:false,

                message:
                'Usuário já cadastrado.'

            });

        }

        // ========================================
        // HASH PASSWORD
        // ========================================

        const salt =
        await bcrypt.genSalt(10);

        const hashedPassword =
        await bcrypt.hash(

            password,

            salt

        );

        // ========================================
        // CREATE USER
        // ========================================

        const user =
        await User.create({

            name,

            email,

            password:
            hashedPassword

        });

        // ========================================
        // TOKEN
        // ========================================

        const token =
        jwt.sign(

            {

                id:user._id,

                email:user.email

            },

            process.env.JWT_SECRET,

            {

                expiresIn:
                process.env.JWT_EXPIRES_IN ||
                '7d'

            }

        );

        // ========================================
        // RESPONSE
        // ========================================

        res.status(201).json({

            success:true,

            message:
            'Usuário cadastrado com sucesso.',

            token,

            user:{

                id:user._id,

                name:user.name,

                email:user.email,

                role:user.role

            }

        });

    } catch(error){

        res.status(500).json({

            success:false,

            message:
            'Erro ao registrar usuário.',

            error:error.message

        });

    }

};

// ========================================
// LOGIN
// ========================================

exports.login =
async (req, res) => {

    try{

        const {

            email,

            password

        } = req.body;

        // ========================================
        // VALIDATION
        // ========================================

        if(

            !email ||

            !password

        ){

            return res.status(400).json({

                success:false,

                message:
                'Preencha email e senha.'

            });

        }

        // ========================================
        // FIND USER
        // ========================================

        const user =
        await User.findOne({

            email

        });

        if(!user){

            return res.status(404).json({

                success:false,

                message:
                'Usuário não encontrado.'

            });

        }

        // ========================================
        // VALIDATE PASSWORD
        // ========================================

        const validPassword =
        await bcrypt.compare(

            password,

            user.password

        );

        if(!validPassword){

            return res.status(401).json({

                success:false,

                message:
                'Senha inválida.'

            });

        }

        // ========================================
        // TOKEN
        // ========================================

        const token =
        jwt.sign(

            {

                id:user._id,

                email:user.email

            },

            process.env.JWT_SECRET,

            {

                expiresIn:
                process.env.JWT_EXPIRES_IN ||
                '7d'

            }

        );

        // ========================================
        // RESPONSE
        // ========================================

        res.status(200).json({

            success:true,

            message:
            'Login realizado com sucesso.',

            token,

            user:{

                id:user._id,

                name:user.name,

                email:user.email,

                role:user.role

            }

        });

    } catch(error){

        res.status(500).json({

            success:false,

            message:
            'Erro ao realizar login.',

            error:error.message

        });

    }

};
