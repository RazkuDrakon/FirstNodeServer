let mysql = require('mysql')

let conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senka',
    database: 'bd_examen_psp'
})

conexion.connect(error => {
    if (error)
        console.log('Error de conexion con la base de datos/mysql: \n', error)
    else
        console.log('Conectado a la base de datos\n')
})

module.exports = conexion