import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { RestaurantsModule } from './restaurants/restaurants.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { IS_DEVELOPMENT, IS_PRODUCTION } from './constants/projectStage.constants'
import * as Joi from 'joi'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './configs/typeOrm.config'
import { RestaurantEntity } from './restaurants/entities/restaurant.entity'
import { CommonModule } from './common/common.module'
import { UsersModule } from './users/users.module'
import { UserEntity } from './users/entites/user.entity'
import { AuthModule } from './auth/auth.module';

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
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeOrmConfig([
                UserEntity,
                // RestaurantEntity
            ]),
        }),
        GraphQLModule.forRoot({
            // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            autoSchemaFile: true,
        }),
        // RestaurantsModule,
        CommonModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [],
})
export class AppModule {}
