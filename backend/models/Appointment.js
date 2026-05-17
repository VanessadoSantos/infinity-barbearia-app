const mongoose =
require('mongoose');

// ========================================
// APPOINTMENT SCHEMA
// ========================================

const AppointmentSchema =
new mongoose.Schema(

    {

        clientName:{

            type:String,

            required:true,

            trim:true,

            minlength:3,

            maxlength:100

        },

        phone:{

            type:String,

            required:true,

            trim:true

        },

        service:{

            type:String,

            required:true,

            trim:true

        },

        barber:{

            type:String,

            trim:true,

            default:'Não definido'

        },

        date:{

            type:String,

            required:true

        },

        hour:{

            type:String,

            required:true

        },

        status:{

            type:String,

            enum:[

                'Pendente',

                'Confirmado',

                'Concluído',

                'Cancelado'

            ],

            default:'Pendente'

        },

        notes:{

            type:String,

            trim:true,

            maxlength:500,

            default:''

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

    'Appointment',

    AppointmentSchema

);
