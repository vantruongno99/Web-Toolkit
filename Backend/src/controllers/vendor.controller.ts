import { Request, Response, Router } from 'express';
import vendorService from '../services/vendor.service';
import middleware from "../utils/middleware"

require('express-async-errors');

const techRouter = Router();

techRouter.post('/', async (req: Request, res: Response) => {
    const sensors = await vendorService.addVendor(req.body)
    res.status(200).json(sensors)
})

techRouter.post('/:applicationId/:vendorId', async (req: Request, res: Response) => {
    const applicationId = Number(req.params.applicationId)
    const vendorId = Number(req.params.vendorId)
    const sensors = await vendorService.assignVendor(applicationId, vendorId)
    res.status(200).json(sensors)
})


techRouter.get('/', async (req: Request, res: Response) => {
    const sensors = await vendorService.getAllVendor()
    res.status(200).json(sensors)
})

techRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.deviceId)
    const sensors = await vendorService.getAllVendorById(id)
    res.status(200).json(sensors)
})



export default techRouter
