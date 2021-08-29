import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../users/entites/user.entity'
import { Repository } from 'typeorm'
import { LoginInput } from './dtos/login.dto'
import { AUTH_ERROR } from './contants/auth-errors.constants'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

    async login({ email, password }: LoginInput): Promise<{ user: UserEntity; token?: string }> {
        const user = await this.userRepository.findOne({
            email,
        })

        if (!user) {
            throw new Error(AUTH_ERROR.AUTHORIZATION_FAIL)
        }

        const isValidPassword = await user.validationPassword(password)

        if (!isValidPassword) {
            throw new Error(AUTH_ERROR.AUTHORIZATION_FAIL)
        }

        return {
            user,
        }
    }
}
