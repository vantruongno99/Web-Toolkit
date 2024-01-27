import { Request, Response, Router } from 'express';
import middleware from "../utils/middleware"
import adminService from '../services/admin.service';

require('express-async-errors');

const adminRouter = Router();

adminRouter.put('/approve/:vendorId/:applicationId', middleware.userExtractor, async (req: Request, res: Response) => {
    const applicationId = Number(req.params.applicationId)
    const vendorId = Number(req.params.vendorId)
    await adminService.approve(vendorId, applicationId)
    res.status(200).end()
})

adminRouter.put('/disapprove/:vendorId/:applicationId', middleware.userExtractor, middleware.adminRequire, async (req: Request, res: Response) => {
    const applicationId = Number(req.params.applicationId)
    const vendorId = Number(req.params.vendorId)
    await adminService.disapprove(vendorId, applicationId)
    res.status(200).end()
})

adminRouter.get('/approve', middleware.userExtractor, middleware.adminRequire, async (req: Request, res: Response) => {
    const data = await adminService.getAll()
    res.status(200).json(data)
})





export default adminRouter
