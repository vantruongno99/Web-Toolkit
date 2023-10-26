import { Request, Response, Router } from 'express';
import vendorService from '../services/vendor.service';
import middleware from "../utils/middleware"

require('express-async-errors');

const vendorRoute = Router();

vendorRoute.post('/', async (req: Request, res: Response) => {
    const sensors = await vendorService.addVendor(req.body)
    res.status(200).json(sensors)
})

vendorRoute.post('/:vendorId/apply/:applicationId', async (req: Request, res: Response) => {
    const applicationId = Number(req.params.applicationId)
    const vendorId = Number(req.params.vendorId)
    const sensors = await vendorService.assignVendor(applicationId, vendorId, req.body)
    res.status(200).json(sensors)
})


vendorRoute.get('/', async (req: Request, res: Response) => {
    const sensors = await vendorService.getAllVendor()
    res.status(200).json(sensors)
})

vendorRoute.get('/:id/application', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const sensors = await vendorService.getApplicationByVendorId(id)
    res.status(200).json(sensors)
})

vendorRoute.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const sensors = await vendorService.getVendorById(id)
    res.status(200).json(sensors)
})

vendorRoute.get('/ABN/:ABN', async (req: Request, res: Response) => {
    const ABN = Number(req.params.ABN)
    const sensors = await vendorService.getVendorByABN(ABN)
    res.status(200).json(sensors)
})







export default vendorRoute
