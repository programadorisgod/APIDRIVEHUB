import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.stringConexion, {
      // useNewUrlParser utiliza para indicar a Mongoose que utilice la nueva cadena de conexión de MongoDB en lugar de la antigua cadena de conexión. Si se tiene activada asegura que toda la configuaracion se establezca correctamente
      useNewUrlParser: true,
      // useUnifiedTopology habilitada, Mongoose utiliza la nueva topología de MongoDB y asegura que todas las opciones de configuración se establezcan correctamente.
      useUnifiedTopology: true
    })
    console.log('[database] conect DB mongoose '.magenta.bold)
  } catch (error) {
    console.log('error:', error)
  }
}
export default connectDB
