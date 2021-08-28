/* eslint-disable @typescript-eslint/ban-types */
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { IS_PRODUCTION } from '../constants'
import { EntitySchema } from 'typeorm/entity-schema/EntitySchema'

export const typeOrmConfig =
    (entities?: (Function | string | EntitySchema<any>)[]) =>
    async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: +configService.get('DB_PORT'),
            database: configService.get('DB_NAME'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            logging: !IS_PRODUCTION, // logging of all queries and errors
            synchronize: !IS_PRODUCTION, // https://medium.com/swlh/migrations-over-synchronize-in-typeorm-2c66bc008e74
            entities,
        }
    }
