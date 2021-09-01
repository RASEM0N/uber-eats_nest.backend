import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { IS_DEVELOPMENT, IS_PRODUCTION } from './constants/projectStage.constants'
import * as Joi from 'joi'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './configs/typeOrm.config'
import { CommonModule } from './common/common.module'
import { UsersModule } from './users/users.module'
import { UserEntity } from './users/entites/user.entity'
import { AuthModule } from './auth/auth.module'
import { JwtModule } from './jwt/jwt.module'
import { JwtMiddleware } from './jwt/jwt.middleware'
import { VerificationEntity } from './users/entites/verification.entity'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: IS_DEVELOPMENT
                ? ['.env.dev', '.dev.env', '.env.development', '.development.env']
                : '.env.test',
            ignoreEnvFile: IS_PRODUCTION,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('development', 'production').required(),
                PORT: Joi.string().required(),
                DB_HOST: Joi.string().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                DB_PORT: Joi.string().required(),
                JWT_SECRET: Joi.string().min(6).max(128).required(),
                JWT_EXPIRES: Joi.string().required(),
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeOrmConfig([
                UserEntity,
                VerificationEntity,
                // RestaurantEntity
            ]),
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            context: ({ req }) => {
                return {
                    user: req['user'],
                }
            },
        }),
        JwtModule.forRoot({
            secret_key: process.env.JWT_SECRET,
            expires: process.env.JWT_EXPIRES,
        }),
        // RestaurantsModule,
        CommonModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(JwtMiddleware).forRoutes({
            path: '/graphql',
            method: RequestMethod.POST,
        })
    }
}
