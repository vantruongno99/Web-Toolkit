import { Request, Response, Router } from 'express';
import dataService from '../services/data.service';
import middleware from '../utils/middleware';

require('express-async-errors');

const dataRouter = Router();

dataRouter.get('/', async (req: Request, res: Response) => {
    const data = await dataService.getAll()
    res.status(200).json(data)
})




dataRouter.post('/purpose', async (req: Request, res: Response) => {
    const input = req.body.name
    const data = await dataService.purposeAdd(input)
    res.status(200).json(data)
})

dataRouter.post('/participation', async (req: Request, res: Response) => {
    const input = req.body.name
    const data = await dataService.participationAdd(input)
    res.status(200).json(data)
})

dataRouter.post('/engagement', async (req: Request, res: Response) => {
    const input = req.body.name
    const data = await dataService.engagementAdd(input)
    res.status(200).json(data)
})

dataRouter.post('/scale', async (req: Request, res: Response) => {
    const input = req.body.name
    const data = await dataService.scaleAdd(input)
    res.status(200).json(data)
})

dataRouter.post('/budget', async (req: Request, res: Response) => {
    const input = req.body.name
    const data = await dataService.budgetAdd(input)
    res.status(200).json(data)
})

dataRouter.post('/solution', async (req: Request, res: Response) => {
    const input = req.body.name
    const data = await dataService.solutionAdd(input)
    res.status(200).json(data)
})







dataRouter.delete('/purpose/:name', async (req: Request, res: Response) => {
    const input = req.params.name
    await dataService.purposeDelete(input)
    res.status(204).end()
})

dataRouter.delete('/participation/:name', async (req: Request, res: Response) => {
    const input = req.params.name
    await dataService.participationDelete(input)
    res.status(204).end()
})

dataRouter.delete('/engagement/:name', async (req: Request, res: Response) => {
    const input = req.params.name
    await dataService.engagementDelete(input)
    res.status(204).end()
})

dataRouter.delete('/scale/:name', async (req: Request, res: Response) => {
    const input = req.params.name
    console.log(input)
    await dataService.scaleDelete(input)
    res.status(204).end()
})

dataRouter.delete('/budget/:name', async (req: Request, res: Response) => {
    const input = req.params.name
    await dataService.budgetDelete(input)
    res.status(204).end()
})

dataRouter.delete('/solution/:name', async (req: Request, res: Response) => {
    const input = req.params.name
    await dataService.solutionDelete(input)
    res.status(204).end()
})










export default dataRouter
