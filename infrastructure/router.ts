import express from 'express';
import { UserController } from '../interfaces/controllers/UserController.ts'
import { MysqlConnection } from './MysqlConnection.ts'

const mysqlConnection = new MysqlConnection()
const userController = new UserController(mysqlConnection)
let router = express.Router()

router.post('/users/create', async (req: express.Request, res: express.Response) => {
  let result = await userController.createUser(req, res)
  res.send(result)
})

export default router