const express = require('express');
const conectarDb = require('./config/db')
const auth= require('./middleware/auth')
//crear el servidor
const app = express();

//conectar a la bufferedData
conectarDb()

//puerto de la app
const port = process.env.PORT || 4000;

//habilitar leer los valores de un body
app.use(express.json())

//routas de las append
app.use('/api/usuario', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/enlaces', require('./routes/enlaces'))
app.use('/api/archivos', require('./routes/archivos'))



app.listen(port, '0.0.0.0', ()=>{
    console.info(`El servidor esta funcionando en el puerto ${port}`)
})