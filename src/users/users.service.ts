import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entites/user.entity'
import { Connection, Repository } from 'typeorm'
import { CreateAccountInput } from './dtos/create-account.dto'
import { USER_ERROR } from './constants/user-errors.contants'
import { EditProfileInput } from './dtos/edit-profile'
import { VerificationEntity } from './entites/verification.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(VerificationEntity)
        private readonly verificationRepository: Repository<VerificationEntity>,
        @Inject(Connection) private readonly connection: Connection,
    ) {}

    async create({ email, password, role }: CreateAccountInput): Promise<UserEntity> {
        const exist = await this.userRepository.findOne({ email })

        if (exist) {
            throw new Error(USER_ERROR.NOT_UNIQUE_EMAIL)
        }

        const queryRunner = this.connection.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const newUser = this.userRepository.create({
                email,
                password,
                role,
            })

            const user = await queryRunner.manager.save(newUser)

            const verification = this.verificationRepository.create({
                code: '1233543',
                user,
            })

            await queryRunner.manager.save(verification)

            await queryRunner.commitTransaction()
            return user
        } catch (e) {
            await queryRunner.rollbackTransaction()

            throw new Error(e.message)
        } finally {
            await queryRunner.release()
        }
    }

    async findById(userId: string | number): Promise<UserEntity | undefined> {
        return this.userRepository.findOne(userId)
    }

    async editProfile(userId: number | string, data: EditProfileInput): Promise<UserEntity> {
        const user = await this.userRepository.findOne(userId)

        if (!user) {
            throw new Error(USER_ERROR.NOT_FOUND)
        }

        for (const key in data) {
            if (data[key] !== undefined && data.hasOwnProperty(key) && user.hasOwnProperty(key)) {
                user[key] = data[key]
            }
        }

        return this.userRepository.save(user)
    }
}
