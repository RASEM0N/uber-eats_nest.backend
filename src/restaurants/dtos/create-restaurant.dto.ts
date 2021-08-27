import { RestaurantEntity } from '../entities/restaurant.entity'
import { InputType, OmitType } from '@nestjs/graphql'

@InputType() // аргумент, как объект input
// @ArgsType() // множество аргументов
export class CreateRestaurantInput extends OmitType(RestaurantEntity, []) {}
