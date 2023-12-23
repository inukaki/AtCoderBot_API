import mysql from 'mysql'
import dotenv from 'dotenv'
import util from 'util'
import { IDBConnection } from '../interfaces/database/IDBConnection.ts'

export class MysqlConnection extends IDBConnection {
  private pool: any

  constructor() {
    super()
    dotenv.config()
    this.pool = mysql.createPool({
      connectionLimit: 5,
      host: "db",
      port: 3306,
      user: "user",
      password: "password",
      database: "atcoder",
      timezone: 'utc'
    })

    this.pool.getConnection((error: any, connection: any) => {
      if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
        }
        if (error.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
        }
      }

      if (connection) connection.release()

      return
    })
    this.pool.query = util.promisify(this.pool.query)

    // pool event
    this.pool.on('connection', (connection: any) => {
      console.log('mysql connection create')
    })

    this.pool.on('release', (connection: any) => {
      console.log('Connection %d released', connection.threadId)
    })
  }

  execute(query: string, params: any = null) {
    if (params !== null) {
      return this.pool.query(query, params)
    } else {
      return this.pool.query(query)
    }
  }
}
