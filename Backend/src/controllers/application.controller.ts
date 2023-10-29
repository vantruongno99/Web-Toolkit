import { Request, Response, Router } from 'express';
import applicationService from '../services/application.service';
import middleware from "../utils/middleware"
import { ApplicationInput } from '../models/application.modal';

require('express-async-errors');

const techRouter = Router();

techRouter.post('/', async (req: Request, res: Response) => {
    const sensors = await applicationService.addApplication(req.body)
    res.status(200).json(sensors)
})


techRouter.get('/', async (req: Request, res: Response) => {
    const sensors = await applicationService.getAllApplication()
    res.status(200).json(sensors)
})

techRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    console.log("trigger")
    const technology = await applicationService.getApplicationById(id)
    res.status(200).json(technology)
})


techRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    await applicationService.deleteApplication(id)
    res.status(204).end()
})

techRouter.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const data: ApplicationInput = req.body
    const sensor = await applicationService.editApplication(data, id)
    res.status(200).json(sensor)
})



export default techRouter
