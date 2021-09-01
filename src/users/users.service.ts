import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entites/user.entity'
import { Repository } from 'typeorm'
import { CreateAccountInput } from './dtos/create-account.dto'
import { USER_ERROR } from './constants/user-errors.contants'
import { EditProfileInput } from './dtos/edit-profile'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

    async create({ email, password, role }: CreateAccountInput): Promise<UserEntity> {
        const exist = await this.userRepository.findOne({ email })

        if (exist) {
            throw new Error(USER_ERROR.NOT_UNIQUE_EMAIL)
        }

        const user = await this.userRepository.create({
            email,
            password,
            role,
        })

        return this.userRepository.save(user)
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
