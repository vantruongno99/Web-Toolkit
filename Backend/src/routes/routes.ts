import { Router } from 'express';
import appRouter from '../controllers/application.controller';
import techRouter from '../controllers/technolofy.controller';




const routes = Router()
routes.use('/api/app',appRouter)
routes.use('/api/tech',techRouter)




export default routes 