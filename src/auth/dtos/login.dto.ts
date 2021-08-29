import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { IsString, Length } from 'class-validator'
import { UserEntity } from 'src/users/entites/user.entity'
import { MutationOutput } from '../../common/dtos/mutation-output.dto'

@InputType()
export class LoginInput extends PickType(UserEntity, ['email', 'password']) {
    @Field((type) => String)
    @IsString()
    @Length(4, 24)
    password: string
}

@ObjectType()
export class LoginOutput extends MutationOutput {
    @Field((type) => UserEntity, {
        nullable: true,
    })
    user?: UserEntity

    @Field((type) => String, {
        nullable: true,
    })
    token?: string
}
