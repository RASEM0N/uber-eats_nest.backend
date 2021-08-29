import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { CoreEntity } from '../../common/entities/core.entity'
import { IsEmail, IsEnum, Length } from 'class-validator'
import { compare, genSalt, hash } from 'bcryptjs'
import { InternalServerErrorException } from '@nestjs/common'

enum UserRole {
    Owner,
    Client,
    Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' })

@InputType({
    isAbstract: true,
})
@ObjectType()
@Entity({
    name: 'user',
})
export class UserEntity extends CoreEntity {
    @Field((type) => String)
    @Column({
        unique: true,
    })
    @IsEmail()
    @Length(4, 32)
    email: string

    // валидация и работа c graphql
    // извне
    @Column()
    password: string

    @Field((type) => UserRole)
    @Column({
        type: 'enum',
        enum: UserRole,
    })
    @IsEnum(UserRole)
    role: UserRole

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword(): Promise<void> {
        try {
            const salt = await genSalt(10)
            this.password = await hash(this.password, salt)
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException()
        }
    }

    async validationPassword(password: string): Promise<boolean> {
        try {
            return compare(password, this.password)
        } catch (e) {
            console.error(e)
            return false
        }
    }
}
