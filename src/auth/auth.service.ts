import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../users/entites/user.entity'
import { Repository } from 'typeorm'
import { LoginInput } from './dtos/login.dto'
import { AUTH_ERROR } from './contants/auth-errors.constants'
import { JwtService } from '../jwt/jwt.service'
import { VerificationEntity } from '../users/entites/verification.entity'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(VerificationEntity)
        private readonly verificationRepository: Repository<VerificationEntity>,
        @Inject(JwtService) private readonly jwtService: JwtService,
    ) {}

    async login({ email, password }: LoginInput): Promise<{ user: UserEntity; token?: string }> {
        const user = await this.userRepository.findOne({
            email,
        })

        if (!user) {
            throw new Error(AUTH_ERROR.AUTHORIZATION_FAIL)
        }

        if (!(await user.validationPassword(password))) {
            throw new Error(AUTH_ERROR.AUTHORIZATION_FAIL)
        }

        const token = this.jwtService.sign(user.id)

        return {
            user,
            token,
        }
    }

    async verifyEmail(code: string): Promise<boolean> {
        const verification = await this.verificationRepository.findOne(
            {
                code,
            },
            {
                relations: ['user'],
            },
        )

        if (!verification) {
            throw new Error(AUTH_ERROR.INVALID_VERIFICATION_CODE)
        }

        const user = verification.user
        user.verified = true

        await this.userRepository.save(user)

        return true
    }
}
