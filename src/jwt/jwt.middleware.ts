import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { NextFunction, Request, Response } from 'express'
import { JwtService } from './jwt.service'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    // constructor(
    //     @Inject(JwtService) private readonly jwtService: JwtService,
    //     @Inject(UsersService) private readonly userService: UsersService,
    // ) {}

    use(req: Request, res: Response, next: NextFunction): void {
        console.log(req.header('x-jwt'))
        next()
    }
}
