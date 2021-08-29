import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { UserEntity } from '../entites/user.entity'
import { MutationOutput } from '../../common/dtos/mutation-output.dto'
import { IsString, Length } from 'class-validator'

@InputType()
export class CreateAccountInput extends PickType(UserEntity, ['email', 'password', 'role']) {
    @Field((type) => String)
    @IsString()
    @Length(4, 24)
    password: string
}

@ObjectType()
export class CreateAccountOutput extends MutationOutput {
    @Field((type) => UserEntity, {
        nullable: true,
    })
    user?: UserEntity
}
