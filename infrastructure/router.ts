import express from 'express';
import { server } from './server.ts'; 

let router = express.Router()

router.post('/users/create', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.userController.createUser(req, res)
  res.send(result)
})

router.get('/submissions/from', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.submissionController.getUserSubmissionsByTime(req, res)
  res.send(result)
})

router.get('/result/server', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.resultController.getUserResultByTimeAndServer(req, res)
  res.send(result)
})

export default router