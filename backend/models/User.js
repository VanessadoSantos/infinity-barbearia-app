const mongoose =
require('mongoose');

// ========================================
// USER SCHEMA
// ========================================

const UserSchema =
new mongoose.Schema(

    {

        name:{

            type:String,

            required:true,

            trim:true,

            minlength:3,

            maxlength:100

        },

        email:{

            type:String,

            required:true,

            unique:true,

            trim:true,

            lowercase:true

        },

        password:{

            type:String,

            required:true,

            minlength:6

        },

        role:{

            type:String,

            enum:[

                'admin',

                'client'

            ],

            default:'client'

        },

        active:{

            type:Boolean,

            default:true

        }

    },

    {

        timestamps:true

    }

);

// ========================================
// EXPORT
// ========================================

module.exports = mongoose.model(

    'User',

    UserSchema

);
