import { RestaurantEntity } from '../entities/restaurant.entity'
import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql'
import { MutationOutput } from '../../common/dtos/mutation-output.dto'

// When RestaurantEntity don't use a @InputType()
// @InputType()
// export class CreateRestaurantInput extends OmitType(RestaurantEntity, ['id'], ----InputType----) {}

@InputType()
export class CreateRestaurantInput extends OmitType(RestaurantEntity, ['id']) {}

@ObjectType()
export class CreateRestaurantOutput extends MutationOutput {
    @Field((type) => RestaurantEntity, {
        nullable: true,
    })
    restaurant?: RestaurantEntity
}
