import mysql from 'mysql2/promise'
import 'dotenv/config'

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

let connection

try {
  connection = await mysql.createConnection(config)

  function handleConnection() {
    // Si la conexion falla vuelve a conectar
    connection.connect((err) => {
      if (err) {
        console.log('[Error Connection]', err)
        setTimeout(handleConnection, 1000)
      } else {
        console.log('[db connect] Connected successfully to MySQL')
      }

      // si durante la conexion se pierde intenta conectar otra vez
      connection.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          handleConnection()
        } else {
          connection.end()
          throw err
        }
      })
    })
  }
  handleConnection()
} catch (err) {
  // si no logra conectarse
  const createConnectionErr = new Error()
  createConnectionErr.message = `Could not establish connection: ${err.message}`
  console.error('Error during connection:', createConnectionErr)
}

export default connection
