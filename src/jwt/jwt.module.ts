import { DynamicModule, Global, Module } from '@nestjs/common'
import { JwtService } from './jwt.service'
import { JwtConfigOptions } from './interfaces/jwt-options.interface'
import { JWT_CONFIG_OPTIONS } from './constants/jwt-options.constants'

@Module({})
@Global() // т.к. у нас forRoot, и шоб инжектить jwtService
export class JwtModule {
    static forRoot({ expires, secret_key }: JwtConfigOptions): DynamicModule {
        return {
            module: JwtModule,
            providers: [
                JwtService,
                {
                    provide: JWT_CONFIG_OPTIONS,
                    useValue: {
                        expires,
                        secret_key,
                    },
                },
            ],
            exports: [JwtService],
        }
    }
}
