import { Request, Response, Router } from 'express';
import middleware from "../utils/middleware"
import adminService from '../services/admin.service';

require('express-async-errors');

const adminRouter = Router();

adminRouter.put('/approve/:vendorId/:applicationId', async (req: Request, res: Response) => {
    const applicationId = Number(req.params.applicationId)
    const vendorId = Number(req.params.vendorId)
    await adminService.approve(vendorId, applicationId)
    res.status(200).end()
})

adminRouter.put('/disapprove/:vendorId/:applicationId', async (req: Request, res: Response) => {
    const applicationId = Number(req.params.applicationId)
    const vendorId = Number(req.params.vendorId)
    await adminService.disapprove(vendorId, applicationId)
    res.status(200).end()
})

adminRouter.get('/approve', async (req: Request, res: Response) => {
   const data = await adminService.getAll()
    res.status(200).json(data)
})





export default adminRouter
