import { Column, Entity } from 'typeorm'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { CoreEntity } from '../../common/entities/core.entity'
import { IsEmail, IsEnum, IsString, Length } from 'class-validator'

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

    @Field((type) => String)
    @Column()
    @IsString()
    @Length(4, 24)
    password: string

    @Field((type) => UserRole)
    @Column({
        type: 'enum',
        enum: UserRole,
    })
    @IsEnum(UserRole)
    role: UserRole
}
