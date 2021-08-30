import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { UserEntity } from './entites/user.entity'
import { Query } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { Inject, UseGuards } from '@nestjs/common'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import { AuthService } from '../auth/auth.service'
import { LoginInput, LoginOutput } from '../auth/dtos/login.dto'
import { AuthGuard } from '../auth/auth.guard'
import { AuthUser } from '../auth/auth.decorator'

@Resolver((of) => UserEntity)
export class UsersResolver {
    constructor(
        @Inject(UsersService) private readonly userService: UsersService,
        @Inject(AuthService) private readonly authService: AuthService,
    ) {}

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

    @Mutation((returns) => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        try {
            const { user, token } = await this.authService.login(loginInput)

            return {
                ok: true,
                user,
                token,
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

    @Query((returns) => UserEntity)
    @UseGuards(new AuthGuard())
    async me(@AuthUser() user: UserEntity) {
        return user
    }
}
