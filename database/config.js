const mongoose = require('mongoose');

// main().catch(err => console.log(err));

const cafeConnection = async() => {
 try {
    await mongoose.connect( process.env.MONGO_ATLAS);

    //  !!!!!!YA NO ES SOPORTADO!!!!!!
    // await mongoose.connect( process.env.MONGO_ATLAS, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false
    // });
    console.log('Conexión a la base de datos establecida')
 } catch (error) {
    console.error(error);
    throw new Error('Error: la base de datos no se pudo levantar');
 }
}

module.exports = {
    cafeConnection
}