import { Router } from 'express';
import appRouter from '../controllers/application.controller';
import techRouter from '../controllers/technolofy.controller';
import vendorRoute from '../controllers/vendor.controller';
import adminRoute from '../controllers/admin.controller';


const routes = Router()
routes.use('/api/app',appRouter)
routes.use('/api/tech',techRouter)
routes.use('/api/vendor',vendorRoute)
routes.use('/api/admin',adminRoute)



export default routes 