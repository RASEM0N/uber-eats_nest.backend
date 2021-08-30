import { Module } from '@nestjs/common'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entites/user.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
    providers: [UsersResolver, UsersService],
    exports: [UsersService],
})
export class UsersModule {}
