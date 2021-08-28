import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { RestaurantEntity } from './entities/restaurant.entity'
import { CreateRestaurantInput } from './dtos/create-restaurant.dto'
import { Inject } from '@nestjs/common'
import { RestaurantsService } from './restaurants.service'

@Resolver((of) => RestaurantEntity)
export class RestaurantsResolver {
    constructor(
        @Inject(RestaurantsService) private readonly restaurantService: RestaurantsService,
    ) {}

    @Query(() => String)
    helloPizza(): string {
        return 'hello pizza'
    }

    @Query((returns) => [RestaurantEntity])
    restaurants(): RestaurantEntity[] {
        return []
    }

    @Mutation((returns) => Boolean)
    restaurantCreate(@Args('input') createRestaurantInput: CreateRestaurantInput) {
        return true
    }
}
