import { Router } from 'express';
import appRouter from '../controllers/application.controller';
import techRouter from '../controllers/technolofy.controller';
import vendorRoute from '../controllers/vendor.controller';
import adminRouter from '../controllers/admin.controller';
import dataRouter from '../controllers/data.controller';
import authRouter from '../controllers/auth.controller';


const routes = Router()
routes.use('/api/app',appRouter)
routes.use('/api/auth',appRouter)
routes.use('/api/tech',techRouter)
routes.use('/api/vendor',vendorRoute)
routes.use('/api/admin',adminRouter)
routes.use('/api/data',dataRouter)
routes.use('/api/auth',authRouter)





export default routes 