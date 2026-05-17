const mongoose =
require('mongoose');

// ========================================
// DATABASE CONNECTION
// ========================================

const connectDB = async () => {

    try{

        // ========================================
        // MONGODB CONNECTION
        // ========================================

        const conn =
        await mongoose.connect(

            process.env.MONGO_URI,

            {

                autoIndex:true

            }

        );

        // ========================================
        // SUCCESS
        // ========================================

        console.log(

            `✅ MongoDB conectado:
            ${conn.connection.host}`

        );

    } catch(error){

        // ========================================
        // ERROR
        // ========================================

        console.error(

            '❌ Erro ao conectar MongoDB:'

        );

        console.error(
            error.message
        );

        // ========================================
        // STOP SERVER
        // ========================================

        process.exit(1);

    }

};

// ========================================
// EXPORT
// ========================================

module.exports = connectDB;
