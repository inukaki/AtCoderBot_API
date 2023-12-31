import express from 'express';
import { server } from './server.ts'; 

let router = express.Router()

router.get('/users', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.userController.listUsers(req,res)
  res.send(result)
})

router.get('/users/:discordID', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.userController.getUser(req,res)
  res.send(result)
})

router.put('/users', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.userController.linkUser(req,res)
  res.send(result)
})

router.delete('/users/:discordID', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.userController.unlinkUser(req,res)
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