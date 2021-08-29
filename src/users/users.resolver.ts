import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UserEntity } from './entites/user.entity'
import { Query } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { Inject } from '@nestjs/common'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'

@Resolver((of) => UserEntity)
export class UsersResolver {
    constructor(@Inject(UsersService) private readonly userService: UsersService) {}

    @Query((returns) => String)
    helloUser() {
        return 'hello user'
    }

    @Mutation((returns) => CreateAccountOutput)
    async userCreate(
        @Args('input') createAccountInput: CreateAccountInput,
    ): Promise<CreateAccountOutput> {
        try {
            const createdUser = await this.userService.create(createAccountInput)

            return {
                ok: true,
                user: createdUser,
            }
        } catch (e) {
            const errors = []

            errors.push(e.message)

            return {
                ok: false,
                errors,
            }
        }
    }
}
