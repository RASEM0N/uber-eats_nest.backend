import { ObjectType, OmitType } from '@nestjs/graphql'
import { UserEntity } from '../entites/user.entity'

@ObjectType()
export class UserPublic extends OmitType(
    UserEntity,
    ['password', 'createdAt', 'updatedAt'],
    ObjectType,
) {}
