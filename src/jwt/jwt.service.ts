import { Inject, Injectable } from '@nestjs/common'
import { JWT_CONFIG_OPTIONS } from './jwt.constants'
import { JwtConfigOptions } from './interfaces/jwt-options.interface'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtService {
    constructor(@Inject(JWT_CONFIG_OPTIONS) private readonly jwtConfigOptions: JwtConfigOptions) {}

    sign(someId: string): string {
        const { secret_key, expires } = this.jwtConfigOptions

        return jwt.sign(
            {
                id: someId,
            },
            secret_key,
            {
                expiresIn: expires,
            },
        )
    }

    verify(token: string) {
        const { secret_key } = this.jwtConfigOptions

        return jwt.verify(token, secret_key)
    }
}
