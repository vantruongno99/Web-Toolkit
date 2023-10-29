import { Request, Response, Router } from 'express';
import technologyService from '../services/technology.service';
import middleware from "../utils/middleware"
import { TechnologyInput } from '../models/technology.modal';

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
    const id = Number(req.params.id)
    console.log(id)
    const sensors = await technologyService.getTechnology(id)
    res.status(200).json(sensors)
})

techRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    await technologyService.deleteTechnology(id)
    res.status(204).end()
})

techRouter.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const data: TechnologyInput = req.body
    const sensor = await technologyService.editTechnology(data, id)
    res.status(200).json(sensor)
})




export default techRouter
