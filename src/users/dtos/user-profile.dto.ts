import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql'
import { QueryOutput } from '../../common/dtos/query-output.dto'
import { UserEntity } from '../entites/user.entity'

@ArgsType()
export class UserProfileInput {
    @Field((returns) => ID)
    userId: number
}

@ObjectType()
export class UserProfileOutput extends QueryOutput {
    @Field((returns) => UserEntity, {
        nullable: true,
    })
    user?: UserEntity
}
