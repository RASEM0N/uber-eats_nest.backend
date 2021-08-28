import { Field, ID, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql'
import { RestaurantEntity } from '../entities/restaurant.entity'
import { MutationOutput } from '../../common/dtos/mutation-output.dto'

@InputType()
export class PartialRestaurantInput extends PartialType(OmitType(RestaurantEntity, ['id'])) {}

@InputType()
export class UpdateRestaurantInput {
    @Field((returns) => ID)
    id: number

    @Field((returns) => PartialRestaurantInput)
    data: PartialRestaurantInput
}

@ObjectType()
export class UpdateRestaurantOutput extends MutationOutput {
    @Field((type) => RestaurantEntity, {
        nullable: true,
    })
    restaurant?: RestaurantEntity
}
