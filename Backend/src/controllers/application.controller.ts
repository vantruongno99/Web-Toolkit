import { Request, Response, Router } from 'express';
import applicationService from '../services/application.service';
import middleware from "../utils/middleware"
import { ApplicationInput } from '../models/application.modal';

require('express-async-errors');

const appRouter = Router();

appRouter.post('/',middleware.userExtractor, middleware.adminRequire,  async (req: Request, res: Response) => {
    const sensors = await applicationService.addApplication(req.body)
    res.status(200).json(sensors)
})


appRouter.get('/', async (req: Request, res: Response) => {
    const sensors = await applicationService.getAllApplication()
    res.status(200).json(sensors)
})

appRouter.get('/:id',async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const technology = await applicationService.getApplicationById(id)
    res.status(200).json(technology)
})

appRouter.delete('/:id',middleware.userExtractor, middleware.adminRequire,  async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    await applicationService.deleteApplication(id)
    res.status(204).end()
})

appRouter.put('/:id/image',middleware.userExtractor, middleware.adminRequire,  async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const imageUrl = req.body.imageUrl
    const sensor = await applicationService.editImage(imageUrl, id)
    res.status(200).json(sensor)
})

appRouter.put('/:id', middleware.userExtractor, middleware.adminRequire, async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const data: ApplicationInput = req.body
    const sensor = await applicationService.editApplication(data, id)
    res.status(200).json(sensor)
})


export default appRouter
