import { Request, Response, Router } from 'express';
import applicationService from '../services/application.service';
import middleware from "../utils/middleware"

require('express-async-errors');

const appRouter = Router();

appRouter.post('/', async (req: Request, res: Response) => {
    const sensors = await applicationService.addApplication(req.body)
    res.status(200).json(sensors)
})


appRouter.get('/', async (req: Request, res: Response) => {
    const sensors = await applicationService.getAllApplication()
    res.status(200).json(sensors)
})

appRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.deviceId)
    const sensors = await applicationService.getApplicationByTechId(id)
    res.status(200).json(sensors)
})



export default appRouter
