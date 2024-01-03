import express from 'express';
import { server } from './server.ts'; 

let router = express.Router()

//Users
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

//Servers
router.post('/servers/init', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.serverController.createServer(req,res)
  res.send(result)
})

router.post('/servers/members', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.serverController.addMember(req,res)
  res.send(result)
})

router.get('/servers/:serverID', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.serverController.getServer(req,res)
  res.send(result)
})

//Daily
router.get('/daily', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.dailyController.getDaily(req,res)
  res.send(result)
})

//Results
router.get('/results/server/:serverID', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.resultController.getUserResultByTimeAndServer(req, res)
  res.send(result)
})

router.get('/results/user/:atcoderID', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.resultController.getUserResultByTime(req, res)
  res.send(result)
})

router.get('/results/contest/:contestID', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.resultController.getUserResultByContest(req, res)
  res.send(result)
})

//Contests
router.get('/contests', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.contestController.getContestByTime(req,res)
  res.send(result)
})


router.get('/submissions/from', async (req: express.Request, res: express.Response) => {
  let result = await server.instance.submissionController.getUserSubmissionsByTime(req, res)
  res.send(result)
})


export default router