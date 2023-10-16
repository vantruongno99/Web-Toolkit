import { Request, Response, Router } from 'express';
import technologyService from '../services/technology.service';
import middleware from "../utils/middleware"

require('express-async-errors');

const techRouter = Router();

techRouter.post('/', async (req: Request, res: Response) => {
    const sensors = await technologyService.addTechnology(req.body)
    res.status(200).json(sensors)
})


techRouter.get('/', async (req: Request, res: Response) => {
    const sensors = await technologyService.getAllTechnology()
    res.status(200).json(sensors)
})

techRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.deviceId)
    const sensors = await technologyService.getAllTechnologyById(id)
    res.status(200).json(sensors)
})



export default techRouter
