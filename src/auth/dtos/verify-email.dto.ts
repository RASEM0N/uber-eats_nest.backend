import { MutationOutput } from '../../common/dtos/mutation-output.dto'
import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { VerificationEntity } from 'src/users/entites/verification.entity'

@ObjectType()
export class VerifyEmailOutput extends MutationOutput {}

@InputType()
export class VerifyEmailInput extends PickType(VerificationEntity, ['code']) {}
