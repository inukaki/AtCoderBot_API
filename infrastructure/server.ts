import express from 'express';
import router from './router.ts';
import bodyParser from 'body-parser';
import collect from './api/collectSubmission.ts'
import { MysqlConnection } from './MysqlConnection.ts';
import { UserController } from '../interfaces/controllers/UserController.ts';
import { SubmissionController } from '../interfaces/controllers/SubmissionController.ts';
import { ProblemController } from '../interfaces/controllers/ProblemController.ts';
import collectProblem from './api/collectProblem.ts';

export class server {
  private _mysqlConnection
  private _userController
  private _submissionController
  private _problemController

  private static _instance: server

  constructor() {
      this._mysqlConnection = new MysqlConnection()
      this._userController = new UserController(this._mysqlConnection)
      this._submissionController = new SubmissionController(this._mysqlConnection)
      this,this._problemController = new ProblemController(this._mysqlConnection)
  }

  static get instance(){
    if(!server._instance) {
      server._instance = new server()
    }
    return server._instance
  }

  get mysqlConnection() {
    return this._mysqlConnection
  }

  get userController() {
    return this._userController
  }

  get submissionController() {
    return this._submissionController
  }

  get problemController() {
    return this._problemController
  }
}

const app = express()

// bodyがundefinedにならないように
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route設定
app.use('/api', router)

app.listen(3000, () => {
  console.log('listening on port 3000')
})

//提出を1時間おきに集める
//collect(1703410267, 3600000)
//問題を1日おきに更新
collectProblem(1000*60*60*24)