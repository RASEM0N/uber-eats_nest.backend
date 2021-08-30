import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { NextFunction, Request, Response } from 'express'
import { JwtService } from './jwt.service'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        @Inject(JwtService) private readonly jwtService: JwtService,
        @Inject(UsersService) private readonly userService: UsersService,
    ) {}

    async use(req: Request, _: Response, next: NextFunction): Promise<void> {
        if ('x-jwt' in req.headers) {
            const token = req.headers['x-jwt']

            try {
                const decoded = this.jwtService.verify(token.toString())
                let userId: string | number

                if (typeof decoded === 'string') {
                    userId = decoded
                }

                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                    userId = decoded['id']
                }

                req['user'] = await this.userService.findById(userId)
            } catch (e) {
                console.error(e)
            }
        }

        next()
    }
}
