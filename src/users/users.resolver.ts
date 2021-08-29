import { Resolver } from '@nestjs/graphql'
import { UserEntity } from './entites/user.entity'
import { Query } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { Inject } from '@nestjs/common'

@Resolver((of) => UserEntity)
export class UsersResolver {
    constructor(@Inject(UsersService) private readonly userService: UsersService) {}

    @Query(() => String)
    helloUser() {
        return 'hello user'
    }
}
