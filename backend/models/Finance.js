const mongoose =
require('mongoose');

// ========================================
// FINANCE SCHEMA
// ========================================

const FinanceSchema =
new mongoose.Schema(

    {

        title:{

            type:String,

            required:true,

            trim:true,

            minlength:3,

            maxlength:120

        },

        type:{

            type:String,

            enum:[

                'entrada',

                'saida'

            ],

            required:true

        },

        amount:{

            type:Number,

            required:true,

            min:0

        },

        category:{

            type:String,

            trim:true,

            maxlength:60,

            default:'Geral'

        },

        description:{

            type:String,

            trim:true,

            maxlength:500,

            default:''

        },

        status:{

            type:String,

            enum:[

                'pendente',

                'pago',

                'cancelado'

            ],

            default:'pago'

        }

    },

    {

        timestamps:true

    }

);

// ========================================
// EXPORT
// ========================================

module.exports =
mongoose.model(

    'Finance',

    FinanceSchema

);
