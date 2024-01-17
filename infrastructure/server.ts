import express from 'express';
import router from './router.ts';
import bodyParser from 'body-parser';
import { MysqlConnection } from './MysqlConnection.ts';
import { UserController } from '../interfaces/controllers/UserController.ts';
import { SubmissionController } from '../interfaces/controllers/SubmissionController.ts';
import { ProblemController } from '../interfaces/controllers/ProblemController.ts';
import collectProblem from './api/collectProblem.ts';
import { ServerController } from '../interfaces/controllers/ServerController.ts';
import { ResultController } from '../interfaces/controllers/ResultController.ts';
import { UserSerializer } from '../interfaces/serializers/UserSerializer.ts';
import { SubmissionConverter } from '../application/converter/SubmissionConverter.ts';
import { ServerSerializer } from '../interfaces/serializers/ServerSerializer.ts';
import { SubmissionSerializer } from '../interfaces/serializers/SubmissionSerializer.ts';
import { UserRepository } from '../interfaces/database/UserRepository.ts';
import { SubmissionRepository } from '../interfaces/database/SubmissionRepository.ts';
import { ProblemRepository } from '../interfaces/database/ProblemRepository.ts';
import { ServerRepository } from '../interfaces/database/ServerRepository.ts';
import { ResultConverter } from '../application/converter/ResultConverter.ts';
import { ServerConverter } from '../application/converter/ServerConverter.ts';
import { UserConverter } from '../application/converter/UserConverter.ts';
import { ResultSerializer } from '../interfaces/serializers/ResultSerializer.ts';
import { ProblemConverter } from '../application/converter/ProblemConverter.ts';
import collectSubmission from './api/collectSubmission.ts';
import { ProblemSerializer } from '../interfaces/serializers/ProblemSerializer.ts';
import { ContestResultSerializer } from '../interfaces/serializers/ContestResultSerializer.ts';
import { ContestSerializer } from '../interfaces/serializers/ContestSerializer.ts';
import { ContestRepository } from '../interfaces/database/ContestRepository.ts';
import { ContestConverter } from '../application/converter/ContestConverter.ts';
import { ContestController } from '../interfaces/controllers/ContestController.ts';
import { DailySerializer } from '../interfaces/serializers/DailySerializer.ts';
import { DailyConverter } from '../application/converter/DailyConverter.ts';
import { DailyController } from '../interfaces/controllers/DailyController.ts';
import { VirtualContestSerializer } from '../interfaces/serializers/VirtualContestSerializer.ts';
import { VirtualContestRepository } from '../interfaces/database/VirtualContestRepository.ts';
import { VirtualContestConverter } from '../application/converter/VirtualContestConverter.ts';
import { VirtualContestController } from '../interfaces/controllers/VirtualContestController.ts';
import { StandingConverter } from '../application/converter/StandingConverter.ts';
import { StandingSerializer } from '../interfaces/serializers/StandingSerializer.ts';

export class server {
  private _mysqlConnection

  private _userController
  private _submissionController
  private _problemController
  private _serverController
  private _resultController
  private _contestController
  private _dailyController
  private _virtualContestController
  private _standingConverter

  private _userSerializer
  private _submissionSerializer
  private _problemSerializer
  private _serverSerializer
  private _resultSerializer
  private _contestResultSerializer
  private _contestSerializer
  private _dailySerializer
  private _virtualContestSerializer
  private _standingSerializer

  private _userRepository
  private _submissionRepository
  private _problemRepository
  private _serverRepository
  private _contestRepository
  private _virtualContestRepository

  private _submissionConverter
  private _problemConverter
  private _serverConverter
  private _resultConverter
  private _userConverter
  private _contestConverter
  private _dailyConverter
  private _virtualContestConverter

  private static _instance: server

  constructor() {
      this._mysqlConnection = new MysqlConnection()

      this._userSerializer = new UserSerializer()
      this._submissionSerializer = new SubmissionSerializer()
      this._problemSerializer = new ProblemSerializer()
      this._serverSerializer = new ServerSerializer()
      this._resultSerializer = new ResultSerializer()
      this._contestResultSerializer = new ContestResultSerializer()
      this._contestSerializer = new ContestSerializer()
      this._dailySerializer = new DailySerializer()
      this._virtualContestSerializer = new VirtualContestSerializer()
      this._standingSerializer = new StandingSerializer()

      this._userRepository = new UserRepository(this._mysqlConnection)
      this._submissionRepository = new SubmissionRepository(this._mysqlConnection)
      this._problemRepository = new ProblemRepository(this._mysqlConnection)
      this._serverRepository = new ServerRepository(this._mysqlConnection)
      this._contestRepository = new ContestRepository(this._mysqlConnection)
      this._virtualContestRepository = new VirtualContestRepository(this._mysqlConnection)

      this._submissionConverter = new SubmissionConverter(this._submissionRepository)
      this._problemConverter = new ProblemConverter(this._problemRepository)
      this._serverConverter = new ServerConverter(this._serverRepository)
      this._resultConverter = new ResultConverter()
      this._userConverter = new UserConverter(this._userRepository)
      this._contestConverter = new ContestConverter(this._contestRepository)
      this._dailyConverter = new DailyConverter()
      this._virtualContestConverter = new VirtualContestConverter(this._virtualContestRepository)
      this._standingConverter = new StandingConverter()

      this._userController = new UserController(this.userConverter, this._userSerializer)
      this._submissionController = new SubmissionController(this._submissionConverter, this._submissionSerializer)
      this._problemController = new ProblemController(this._problemConverter, this._problemSerializer)
      this._serverController = new ServerController(this._serverConverter, this._serverSerializer)
      this._resultController = new ResultController(this._resultConverter, this._resultSerializer, this._contestResultSerializer)
      this._contestController = new ContestController(this._contestConverter, this._contestSerializer)
      this._dailyController = new DailyController(this._dailyConverter, this._dailySerializer)
      this._virtualContestController = new VirtualContestController(this._virtualContestConverter, this._virtualContestSerializer)
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

  get serverController() {
    return this._serverController
  }

  get resultController() {
    return this._resultController
  }

  get contestController() {
    return this._contestController
  }

  get dailyController() {
    return this._dailyController
  }

  get virtualContestController() {
    return this._virtualContestController
  }

  get userSerializer() {
    return this._userSerializer
  }

  get submissionSerializer() {
    return this._submissionSerializer
  }

  get problemSerializer() {
    return this._problemSerializer
  }

  get serverSerializer() {
    return this._serverSerializer
  }

  get resultSerializer() {
    return this._resultSerializer
  }

  get contestResultSerializer() {
    return this._contestResultSerializer
  }

  get contestSerializer() {
    return this._contestSerializer
  }

  get dailySerializer() {
    return this._dailySerializer
  }

  get virtualContestSerializer() {
    return this._virtualContestSerializer
  }

  get standingSerializer() {
    return this._standingSerializer
  }

  get userRepository() {
    return this._userRepository
  }

  get submissionRepository() {
    return this._submissionRepository
  }

  get problemRepository() {
    return this._problemRepository
  }

  get serverRepository() {
    return this._serverRepository
  }

  get contestRepository() {
    return this._contestRepository
  }

  get virtualContestRepository() {
    return this._virtualContestRepository
  }

  get submissionConverter() {
    return this._submissionConverter
  }

  get problemConverter() {
    return this._problemConverter
  }

  get serverConverter() {
    return this._serverConverter
  }

  get resultConverter() {
    return this._resultConverter
  }

  get userConverter() {
    return this._userConverter
  }

  get contestConverter() {
    return this._contestConverter
  }

  get dailyConverter() {
    return this._dailyConverter
  }

  get virtualContestConverter() {
    return this._virtualContestConverter
  }

  get standingConverter() {
    return this._standingConverter
  }
}

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// bodyがundefinedにならないように
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route設定
app.use('/api', router)

app.listen(3000, () => {
  console.log('listening on port 3000')
})



//提出を1分おきに集める 2023/12/23 21:00 = 1703332800
collectSubmission(1705460115, 1000*60)
//問題を30分おきに更新
collectProblem(1000*60*30)

