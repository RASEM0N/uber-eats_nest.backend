import { MutationOutput } from '../../common/dtos/mutation-output.dto'
import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { UserEntity } from '../entites/user.entity'
import { IsOptional, IsString, Length } from 'class-validator'

@InputType()
export class EditProfileInput extends PartialType(
    PickType(UserEntity, ['email', 'password', 'role']),
) {
    @Field((type) => String, {
        nullable: true,
    })
    @IsString()
    @IsOptional()
    @Length(4, 24)
    password: string
}

@ObjectType()
export class EditProfileOutput extends MutationOutput {
    @Field((type) => UserEntity, {
        nullable: true,
    })
    user?: UserEntity
}
